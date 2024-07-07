'use strict';

const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { buildWhereClause } = require('../utils/buildWhereClause');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const Associacao = require('../models/associacao');
const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const fs = require('fs/promises');
const path = require('path');
const getFormattedSequelizeExceptions = require('../utils/Exceptions');


// Controller para obter um usuário de ônibus pelo ID
const obterUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioOnibus = await Usuario.findByPk(id, {
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'nome']
                },
                {
                    model: Curso,
                    attributes: ['id', 'nome'],
                    include: [{
                        model: Instituicao,
                        attributes: ['id', 'nome'],
                    }]
                }
            ],
            attributes: ['id', 'nome', 'email', 'telefone', 'endereco', 'matricula', 'tipoAcesso', 'situacao', 'diasUsoTransporte', 'fotoUrl', 'dataEntradaAssociacao']
        });
        if (usuarioOnibus) {
            return res.status(200).json(usuarioOnibus);
        }
        throw new Error('Usuário de ônibus não encontrado.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário de ônibus', error: error.message });
    }
};

// Controller para obter todos os usuários de ônibus
const obterTodosUsuarios = async (req, res) => {
    try {
        const whereClause = buildWhereClause(req.query.filters);
        const orderClause = buildOrderByClause(req.query.orderBy)

        const usuariosOnibus = await Usuario.findAll({
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'nome']
                },
                {
                    model: Curso,
                    attributes: ['id', 'nome'],
                    include: [{
                        model: Instituicao,
                        attributes: ['id', 'nome'],
                    }]
                }
            ],
            attributes: ['id', 'nome', 'tipoAcesso', 'situacao', 'diasUsoTransporte', 'fotoUrl'],
            where: whereClause,
            order: orderClause
        });
        res.status(200).json(usuariosOnibus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter todos os usuários de ônibus', error: error.message });
    }
};

// Controller para criar um novo usuário de ônibus
const criarUsuario = async (req, res) => {
    const { nome, email, telefone, endereco, matricula, cursoId, associacaoId, dataEntradaAssociacao, tipoAcesso, senha, situacao, diasUsoTransporte, exigirRedefinicaoSenha } = (req.body.data ? JSON.parse(req.body.data) : req.body);
    const usuarioFile = req.file;

    try {
        const hashedPassword = await bcrypt.hash(senha || telefone, 15);
        const novoUsuarioOnibus = await Usuario.create({
            nome,
            email: email.toLowerCase(),
            telefone,
            endereco,
            matricula,
            cursoId,
            associacaoId,
            dataEntradaAssociacao,
            tipoAcesso,
            senha: hashedPassword,
            situacao,
            diasUsoTransporte,
            exigirRedefinicaoSenha: exigirRedefinicaoSenha || (!senha ?? true), // Se não foi cadastrado uma senha ele seta o telefone e vai exigir a troca de senha ao iniciar a aplicação
            fotoUrl: usuarioFile?.filename || null
        });
        res.status(201).json(novoUsuarioOnibus);
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
        res.status(500).json({ message: 'Erro ao criar novo usuário de ônibus', error: error.message });
    }
};

// Controller para atualizar um usuário de ônibus existente
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioBody = req.body.data ? JSON.parse(req.body.data) : req.body;
        const usuarioFile = req.file;
        if (usuarioBody.email) {
            usuarioBody.email = usuarioBody.email.toLowerCase();
        }
        const usuarioExistente = await Usuario.findByPk(id);
        const [atualizado] = await Usuario.update({ ...usuarioBody, fotoUrl: usuarioFile?.filename || null }, {
            where: { id: id },
            fields: ['nome', 'email', 'telefone', 'endereco', 'matricula', 'cursoId', 'associacaoId', 'dataEntradaAssociacao', 'tipoAcesso', 'situacao', 'diasUsoTransporte', 'fotoUrl']
        });
        if (atualizado) {
            try {
                if (usuarioExistente.fotoUrl) {
                    const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', usuarioExistente.fotoUrl);
                    await fs.unlink(caminhoImagemAntiga);
                }
            } catch (error) {
                console.log(error)
            }
            return res.status(200).json({ message: 'Usuário do ônibus atualizada com sucesso' });
        }
        throw new Error('Usuário de ônibus não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário de ônibus', error: error.message });
    }
};


// Controller para atualizar a senha de um usuário de ônibus existente
const atualizarSenhaUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { senhaAntiga, senhaNova } = req.body;

        // Buscar o usuário no banco de dados
        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verificar se a senha antiga está correta
        const isPasswordValid = await bcrypt.compare(senhaAntiga, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha antiga está incorreta' });
        }

        // Gerar hash da nova senha
        const hashedPassword = await bcrypt.hash(senhaNova, 15);

        // Atualizar a senha no banco de dados
        const [atualizado] = await Usuario.update(
            { senha: hashedPassword, exigirRedefinicaoSenha: false },
            { where: { id: id } }
        );

        if (atualizado) {
            return res.status(200).json({ message: 'Senha do usuário atualizada com sucesso' });
        }

        throw new Error('Senha não atualizada.');
    } catch (error) {
        console.error('Erro ao atualizar a senha do usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar a senha do usuário', error: error.message });
    }
};
// Controller para excluir um usuário de ônibus
const excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioExistente = await Usuario.findByPk(id);
        const excluido = await Usuario.destroy({
            where: { id: id }
        });
        if (excluido) {
            try {
                if (usuarioExistente.fotoUrl) {
                    const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', usuarioExistente.fotoUrl);
                    await fs.unlink(caminhoImagemAntiga);
                }
            } catch (error) {
                console.log(error)
            }
            return res.status(200).json({ message: 'Usuário de ônibus excluído com sucesso.' });
        }
        throw new Error('Usuário de ônibus não encontrado ou não excluído.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ title: 'Erro ao excluir usuário', message: erro.message });
    }
};

module.exports = {
    obterUsuarioPorId,
    obterTodosUsuarios,
    criarUsuario,
    atualizarUsuario,
    atualizarSenhaUsuario,
    excluirUsuario
};
