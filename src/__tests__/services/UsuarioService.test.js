import { jest } from '@jest/globals';
import UsuarioService from '../../services/UsuarioService.js';
import Usuario from '../../models/Usuario.js';
import { StatusCodes } from 'http-status-codes';
import TipoAcessoEnum from '../../enum/TIpoAcessoEnum.js';
import AtivoInativoEnum from '../../enum/AtivoInativoEnum.js';
import Associacao from '../../models/Associacao.js';
import Curso from '../../models/Curso.js';
import Instituicao from '../../models/Instituicao.js';
import bcrypt from 'bcrypt';
import { buildWhereClause } from '../../utils/buildWhereClause.js';
import { buildOrderByClause } from '../../utils/buildOrderByClause.js';

process.env.NODE_ENV = 'test';

describe('UsuarioService', () => {
    const usuarioFake = {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
        cidade: 'São Paulo',
        cpf: '12345678900',
        matricula: '123456',
        cursoId: 1,
        associacaoId: 1,
        tipoAcesso: TipoAcessoEnum.ASSOCIADO,
        cargo: null,
        situacao: AtivoInativoEnum.ATIVO,
        diasUsoTransporte: ['SEGUNDA', 'TERCA'],
        senha: 'hashed_password',
        fotoUrl: 'foto.jpg',
        dataEntradaAssociacao: new Date(),
        associacao: {
            id: 1,
            sigla: 'ASSOC',
            parametro: {
                valor2: 100.00
            }
        },
        curso: {
            id: 1,
            nome: 'Curso Teste',
            instituicao: {
                id: 1,
                nome: 'Instituição Teste'
            }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashed_password'));
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
    });

    test('obterUsuarioPorId retorna usuário quando encontrado', async () => {
        jest.spyOn(Usuario, 'findByPk')
            .mockResolvedValue(usuarioFake);

        const result = await UsuarioService.obterUsuarioPorId(1);
        expect(result).toEqual(usuarioFake);
    });

    test('obterUsuarioPorId lança erro quando usuário não encontrado', async () => {
        jest.spyOn(Usuario, 'findByPk')
            .mockResolvedValue(null);

        await expect(UsuarioService.obterUsuarioPorId(1))
            .rejects
            .toEqual(expect.objectContaining({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Usuário não encontrado'
            }));
    });
    /* 
        test('obterTodosUsuarios retorna lista de usuários', async () => {
            const usuariosFake = [usuarioFake];
            const whereClause = { situacao: AtivoInativoEnum.ATIVO };
            const orderClause = [['nome', 'ASC']];
    
            const findAllSpy = jest.spyOn(Usuario, 'findAll')
                .mockResolvedValue(usuariosFake);
    
            jest.spyOn(buildWhereClause, 'buildWhereClause')
                .mockReturnValue(whereClause);
            jest.spyOn(buildOrderByClause, 'buildOrderByClause')
                .mockReturnValue(orderClause);
    
            const result = await UsuarioService.obterTodosUsuarios(
                JSON.stringify(whereClause),
                JSON.stringify(orderClause)
            );
    
            expect(result).toEqual(usuariosFake);
            expect(findAllSpy).toHaveBeenCalledWith({
                include: [
                    {
                        model: Associacao,
                        attributes: ['id', 'sigla']
                    },
                    {
                        model: Curso,
                        attributes: ['id', 'nome'],
                        include: [
                            {
                                model: Instituicao,
                                attributes: ['id', 'nome']
                            }
                        ]
                    }
                ],
                attributes: [
                    'id',
                    'nome',
                    'cpf',
                    'tipoAcesso',
                    'cargo',
                    'situacao',
                    'diasUsoTransporte',
                    'fotoUrl'
                ],
                where: whereClause,
                order: orderClause
            });
        });
    
        test('criarUsuario cria novo usuário', async () => {
            const novoUsuario = {
                nome: 'João Silva',
                email: 'joao@example.com',
                telefone: '11999999999',
                tipoAcesso: TipoAcessoEnum.ASSOCIADO,
                situacao: AtivoInativoEnum.ATIVO,
                diasUsoTransporte: ['SEGUNDA', 'TERCA']
            };
    
            jest.spyOn(Usuario, 'create')
                .mockResolvedValue({ id: 1, ...novoUsuario, senha: 'hashed_password' });
    
            const result = await UsuarioService.criarUsuario(novoUsuario);
    
            expect(result).toEqual(expect.objectContaining({
                id: 1,
                ...novoUsuario,
                email: novoUsuario.email.toLowerCase(),
                senha: 'hashed_password'
            }));
            expect(bcrypt.hash).toHaveBeenCalledWith(novoUsuario.telefone, 15);
        });
    
        test('atualizarUsuario atualiza usuário existente', async () => {
            const dadosAtualizacao = {
                nome: 'João Silva Atualizado',
                email: 'joao.atualizado@example.com',
                telefone: '11999999999',
                tipoAcesso: TipoAcessoEnum.ASSOCIADO,
                situacao: AtivoInativoEnum.ATIVO,
                diasUsoTransporte: ['SEGUNDA', 'TERCA']
            };
    
            jest.spyOn(Usuario, 'findByPk')
                .mockResolvedValue(usuarioFake);
    
            jest.spyOn(Usuario, 'update')
                .mockResolvedValue([1]);
    
            const result = await UsuarioService.atualizarUsuario(1, dadosAtualizacao);
    
            expect(result).toEqual(expect.objectContaining({
                message: 'Usuário atualizado com sucesso'
            }));
        }); */

    test('atualizarSenha atualiza senha do usuário', async () => {
        const senhas = {
            senhaAntiga: 'senha_antiga',
            senhaNova: 'senha_nova'
        };

        jest.spyOn(Usuario, 'findByPk')
            .mockResolvedValue(usuarioFake);

        jest.spyOn(Usuario, 'update')
            .mockResolvedValue([1]);

        const result = await UsuarioService.atualizarSenha(1, senhas);

        expect(result).toEqual(expect.objectContaining({
            message: 'Senha atualizada com sucesso'
        }));
        expect(bcrypt.compare).toHaveBeenCalledWith(senhas.senhaAntiga, usuarioFake.senha);
        expect(bcrypt.hash).toHaveBeenCalledWith(senhas.senhaNova, 15);
    });

    test('resetarSenha reseta senha do usuário', async () => {
        jest.spyOn(Usuario, 'findByPk')
            .mockResolvedValue(usuarioFake);

        jest.spyOn(Usuario, 'update')
            .mockResolvedValue([1]);

        const result = await UsuarioService.resetarSenha(1);

        expect(result).toEqual(expect.objectContaining({
            message: 'Senha redefinida com sucesso'
        }));
        expect(bcrypt.hash).toHaveBeenCalledWith(usuarioFake.telefone, 15);
    });

    test('excluirUsuario remove usuário', async () => {
        jest.spyOn(Usuario, 'destroy')
            .mockResolvedValue(1);

        await expect(UsuarioService.excluirUsuario(1))
            .resolves
            .not
            .toThrow();
    });

    test('obterUsuariosCompleto retorna lista de usuários com valor mensalidade', async () => {
        const usuariosFake = [usuarioFake];
        const whereClause = { situacao: AtivoInativoEnum.ATIVO };
        const orderClause = [['nome', 'ASC']];

        jest.spyOn(Usuario, 'findAll')
            .mockResolvedValue(usuariosFake.map(u => ({
                ...u,
                toJSON: () => u
            })));

        const result = await UsuarioService.obterUsuariosCompleto(
            JSON.stringify(whereClause),
            JSON.stringify(orderClause)
        );

        expect(result[0]).toEqual(expect.objectContaining({
            ...usuarioFake,
            valorMensalidade: 100.00
        }));
    });

    test('atualizarSenha lança erro quando senha antiga está incorreta', async () => {
        const senhas = {
            senhaAntiga: 'senha_incorreta',
            senhaNova: 'senha_nova'
        };

        jest.spyOn(Usuario, 'findByPk')
            .mockResolvedValue(usuarioFake);

        jest.spyOn(bcrypt, 'compare')
            .mockResolvedValueOnce(false);

        await expect(UsuarioService.atualizarSenha(1, senhas))
            .rejects
            .toEqual(expect.objectContaining({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'Senha antiga está incorreta'
            }));
    });

    test('resetarSenha lança erro quando usuário não encontrado', async () => {
        jest.spyOn(Usuario, 'findByPk')
            .mockResolvedValue(null);

        await expect(UsuarioService.resetarSenha(1))
            .rejects
            .toEqual(expect.objectContaining({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Usuário não encontrado'
            }));
    });
}); 