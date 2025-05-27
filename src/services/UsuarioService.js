import bcrypt from 'bcrypt';
import fs from 'fs/promises';
import path from 'path';
import { usuarioSchema, atualizarSenhaSchema } from '../validators/UsuarioSchema.js';
import Usuario from '../models/Usuario.js';
import Associacao from '../models/Associacao.js';
import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import Parametro from '../models/Parametro.js';
import BusonException from '../exceptions/BusonException.js';
import { StatusCodes } from 'http-status-codes';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';

class UsuarioService {
    async obterUsuarioPorId(id) {
        const usuario = await Usuario.findByPk(id, {
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'sigla'],
                },
                {
                    model: Curso,
                    attributes: ['id', 'nome'],
                    include: [
                        {
                            model: Instituicao,
                            attributes: ['id', 'nome'],
                        },
                    ],
                },
            ],
            attributes: [
                'id',
                'nome',
                'email',
                'telefone',
                'cidade',
                'cpf',
                'matricula',
                'tipoAcesso',
                'cargo',
                'situacao',
                'diasUsoTransporte',
                'fotoUrl',
                'dataEntradaAssociacao',
            ],
        });

        if (!usuario) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
        }
        return usuario;
    }

    async obterTodosUsuarios(filters, orderBy) {
        const whereClause = buildWhereClause(filters);
        const orderClause = buildOrderByClause(orderBy);

        return await Usuario.findAll({
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'sigla'],
                },
                {
                    model: Curso,
                    attributes: ['id', 'nome'],
                    include: [
                        {
                            model: Instituicao,
                            attributes: ['id', 'nome'],
                        },
                    ],
                },
            ],
            attributes: ['id', 'nome', 'cpf', 'tipoAcesso', 'cargo', 'situacao', 'diasUsoTransporte', 'fotoUrl'],
            where: whereClause,
            order: orderClause,
        });
    }

    async criarUsuario(dados, foto) {
        const dadosValidados = await usuarioSchema.validate(dados);

        const hashedPassword = await bcrypt.hash(dadosValidados.senha || dadosValidados.telefone, 15);

        return await Usuario.create({
            ...dadosValidados,
            email: dadosValidados.email.toLowerCase(),
            senha: hashedPassword,
            exigirRedefinicaoSenha: dadosValidados.exigirRedefinicaoSenha || (!dadosValidados.senha ?? true),
            fotoUrl: foto?.filename || null,
        });
    }

    async atualizarUsuario(id, dados, foto) {
        const usuario = await this.obterUsuarioPorId(id);
        const dadosValidados = await usuarioSchema.validate(dados);

        if (dadosValidados.email) {
            dadosValidados.email = dadosValidados.email.toLowerCase();
        }

        const [atualizado] = await Usuario.update(
            { ...dadosValidados, fotoUrl: foto?.filename || usuario.fotoUrl },
            {
                where: { id },
                fields: [
                    'nome',
                    'email',
                    'telefone',
                    'cidade',
                    'cpf',
                    'matricula',
                    'cursoId',
                    'associacaoId',
                    'dataEntradaAssociacao',
                    'tipoAcesso',
                    'cargo',
                    'situacao',
                    'diasUsoTransporte',
                    'fotoUrl',
                ],
            }
        );

        if (!atualizado) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'Usuário não encontrado ou não atualizado');
        }

        if (foto && usuario.fotoUrl) {
            try {
                const caminhoImagemAntiga = path.join(process.cwd(), 'uploads', usuario.fotoUrl);
                await fs.unlink(caminhoImagemAntiga);
            } catch (error) {
                console.error('Erro ao excluir foto antiga:', error);
            }
        }

        return { message: 'Usuário atualizado com sucesso' };
    }

    async atualizarSenha(id, { senhaAntiga, senhaNova }) {
        await atualizarSenhaSchema.validate({ senhaAntiga, senhaNova });

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senhaAntiga, usuario.senha);
        if (!senhaValida) {
            throw new BusonException(StatusCodes.UNAUTHORIZED, 'Senha antiga está incorreta');
        }

        const hashedPassword = await bcrypt.hash(senhaNova, 15);
        const [atualizado] = await Usuario.update(
            { senha: hashedPassword, exigirRedefinicaoSenha: false },
            { where: { id } }
        );

        if (!atualizado) {
            throw new BusonException(StatusCodes.INTERNAL_SERVER_ERROR, 'Erro ao atualizar senha');
        }

        return { message: 'Senha atualizada com sucesso' };
    }

    async resetarSenha(id) {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
        }

        const hashedPassword = await bcrypt.hash(usuario.telefone, 15);
        const [atualizado] = await Usuario.update(
            { senha: hashedPassword, exigirRedefinicaoSenha: true },
            { where: { id } }
        );

        if (!atualizado) {
            throw new BusonException(StatusCodes.INTERNAL_SERVER_ERROR, 'Erro ao redefinir senha');
        }

        return { message: 'Senha redefinida com sucesso' };
    }

    async excluirUsuario(id) {
        const usuario = await this.obterUsuarioPorId(id);

        await Usuario.destroy({ where: { id } });

        if (usuario.fotoUrl) {
            try {
                const caminhoImagemAntiga = path.join(process.cwd(), 'uploads', usuario.fotoUrl);
                await fs.unlink(caminhoImagemAntiga);
            } catch (error) {
                console.error('Erro ao excluir foto:', error);
            }
        }

        return { message: 'Usuário excluído com sucesso' };
    }

    async obterUsuariosCompleto(filters, orderBy) {
        const whereClause = buildWhereClause(filters);
        const orderClause = buildOrderByClause(orderBy);

        const usuarios = await Usuario.findAll({
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'sigla'],
                    include: [
                        {
                            model: Parametro,
                            attributes: ['valor1', 'valor2', 'valor3', 'valor4', 'valor5', 'valor6'],
                        },
                    ],
                },
                {
                    model: Curso,
                    attributes: ['id', 'nome'],
                    include: [
                        {
                            model: Instituicao,
                            attributes: ['id', 'nome'],
                        },
                    ],
                },
            ],
            attributes: ['id', 'nome', 'cpf', 'tipoAcesso', 'cargo', 'situacao', 'diasUsoTransporte', 'fotoUrl'],
            where: whereClause,
            order: orderClause,
        });

        return usuarios.map(usuario => {
            const diasUso = usuario.diasUsoTransporte?.length || 0;
            let valorMensalidade = 0;

            if (usuario.associacao && usuario.associacao.parametro) {
                const key = `valor${diasUso}`;
                valorMensalidade = usuario.associacao.parametro[key] ?? 0;
            }

            return {
                ...usuario.toJSON(),
                valorMensalidade,
            };
        });
    }
}

export default new UsuarioService(); 