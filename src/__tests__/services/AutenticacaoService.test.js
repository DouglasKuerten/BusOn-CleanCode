import { jest } from '@jest/globals';
import AutenticacaoService from '../../services/AutenticacaoService.js';
import Usuario from '../../models/Usuario.js';
import TokenAutenticacao from '../../models/TokenAutenticacao.js';
import Associacao from '../../models/Associacao.js';
import Curso from '../../models/Curso.js';
import Instituicao from '../../models/Instituicao.js';
import { StatusCodes } from 'http-status-codes';
import TipoAcessoEnum from '../../enum/TIpoAcessoEnum.js';
import AtivoInativoEnum from '../../enum/AtivoInativoEnum.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import BusonException from '../../exceptions/BusonException.js';

describe('AutenticacaoService', () => {
    const usuarioFake = {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
        endereco: 'Rua Teste, 123',
        cursoId: 1,
        curso: {
            id: 1,
            nome: 'Curso Teste',
            instituicao: {
                id: 1,
                nome: 'Instituição Teste'
            }
        },
        associacaoId: 1,
        associacao: {
            id: 1,
            sigla: 'ASSOC'
        },
        dataEntradaAssociacao: new Date(),
        tipoAcesso: TipoAcessoEnum.ASSOCIADO,
        situacao: AtivoInativoEnum.ATIVO,
        senha: 'hashed_password',
        exigirRedefinicaoSenha: false,
        fotoUrl: 'foto.jpg'
    };

    const tokenFake = 'fake_jwt_token';
    const refreshTokenFake = 'fake_refresh_token';

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        jest.spyOn(jwt, 'sign').mockImplementation(() => tokenFake);
    });

    describe('login', () => {
        test('deve realizar login com sucesso', async () => {
            const loginData = {
                email: 'joao@example.com',
                senha: 'senha123'
            };

            jest.spyOn(Usuario, 'findOne')
                .mockResolvedValue(usuarioFake);

            jest.spyOn(TokenAutenticacao, 'criarToken')
                .mockResolvedValue(refreshTokenFake);

            const result = await AutenticacaoService.login(loginData);

            expect(Usuario.findOne).toHaveBeenCalledWith({
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
                where: { email: loginData.email.toLowerCase() }
            });

            expect(bcrypt.compare).toHaveBeenCalledWith(loginData.senha, usuarioFake.senha);
            expect(TokenAutenticacao.criarToken).toHaveBeenCalledWith(usuarioFake);
            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    refreshToken: refreshTokenFake,
                    usuarioId: usuarioFake.id,
                    email: usuarioFake.email,
                    tipoAcesso: usuarioFake.tipoAcesso
                },
                process.env.JWT_SECRET,
                { expiresIn: Number(process.env.JWT_EXPIRATION) }
            );

            expect(result).toEqual({
                id: usuarioFake.id,
                nome: usuarioFake.nome,
                email: usuarioFake.email,
                telefone: usuarioFake.telefone,
                endereco: usuarioFake.endereco,
                cursoId: usuarioFake.cursoId,
                cursoNome: usuarioFake.curso.nome,
                instituicaoNome: usuarioFake.curso.instituicao.nome,
                associacaoId: usuarioFake.associacaoId,
                associacaoSigla: usuarioFake.associacao.sigla,
                dataEntradaAssociacao: usuarioFake.dataEntradaAssociacao,
                tipoAcesso: usuarioFake.tipoAcesso,
                situacao: usuarioFake.situacao,
                accessToken: tokenFake,
                refreshToken: refreshTokenFake,
                exigirRedefinicaoSenha: usuarioFake.exigirRedefinicaoSenha,
                fotoUrl: usuarioFake.fotoUrl
            });
        });

        test('deve lançar erro quando usuário não é encontrado', async () => {
            const loginData = {
                email: 'inexistente@example.com',
                senha: 'senha123'
            };

            jest.spyOn(Usuario, 'findOne')
                .mockResolvedValue(null);

            await expect(AutenticacaoService.login(loginData))
                .rejects
                .toEqual(new BusonException(
                    StatusCodes.NOT_FOUND,
                    'E-mail informado não foi encontrado'
                ));
        });

        test('deve lançar erro quando senha está incorreta', async () => {
            const loginData = {
                email: 'joao@example.com',
                senha: 'senha_incorreta'
            };

            jest.spyOn(Usuario, 'findOne')
                .mockResolvedValue(usuarioFake);

            jest.spyOn(bcrypt, 'compare')
                .mockResolvedValueOnce(false);

            await expect(AutenticacaoService.login(loginData))
                .rejects
                .toEqual(new BusonException(
                    StatusCodes.UNAUTHORIZED,
                    'Senha informada está incorreta'
                ));
        });
    });

    describe('refreshToken', () => {
        test('deve renovar token com sucesso', async () => {
            const refreshTokenData = {
                refreshToken: refreshTokenFake
            };

            const storedToken = {
                id: 1,
                token: refreshTokenFake,
                usuarioId: usuarioFake.id,
                dataExpiracao: new Date(Date.now() + 86400000) // tomorrow
            };

            jest.spyOn(TokenAutenticacao, 'findOne')
                .mockResolvedValue(storedToken);

            jest.spyOn(TokenAutenticacao, 'verificarDataValidade')
                .mockReturnValue(false);

            jest.spyOn(Usuario, 'findOne')
                .mockResolvedValue(usuarioFake);

            const result = await AutenticacaoService.refreshToken(refreshTokenData);

            expect(TokenAutenticacao.findOne).toHaveBeenCalledWith({
                where: { token: refreshTokenFake }
            });

            expect(Usuario.findOne).toHaveBeenCalledWith({
                where: { id: usuarioFake.id },
                attributes: {
                    exclude: ['password']
                }
            });

            expect(jwt.sign).toHaveBeenCalledWith(
                {
                    usuarioId: usuarioFake.id,
                    email: usuarioFake.email,
                    tipoAcesso: usuarioFake.tipoAcesso
                },
                process.env.JWT_SECRET,
                { expiresIn: Number(process.env.JWT_EXPIRATION) }
            );

            expect(result).toEqual({
                accessToken: tokenFake,
                refreshToken: refreshTokenFake
            });
        });

        test('deve lançar erro quando refresh token não é encontrado', async () => {
            const refreshTokenData = {
                refreshToken: 'invalid_token'
            };

            jest.spyOn(TokenAutenticacao, 'findOne')
                .mockResolvedValue(null);

            await expect(AutenticacaoService.refreshToken(refreshTokenData))
                .rejects
                .toEqual(new BusonException(
                    StatusCodes.UNAUTHORIZED,
                    'Invalid refresh token'
                ));
        });

        test('deve lançar erro quando refresh token está expirado', async () => {
            const refreshTokenData = {
                refreshToken: refreshTokenFake
            };

            const storedToken = {
                id: 1,
                token: refreshTokenFake,
                usuarioId: usuarioFake.id,
                dataExpiracao: new Date(Date.now() - 1000) // expired
            };

            jest.spyOn(TokenAutenticacao, 'findOne')
                .mockResolvedValue(storedToken);

            jest.spyOn(TokenAutenticacao, 'verificarDataValidade')
                .mockReturnValue(true);

            jest.spyOn(TokenAutenticacao, 'destroy')
                .mockResolvedValue(1);

            await expect(AutenticacaoService.refreshToken(refreshTokenData))
                .rejects
                .toEqual(new BusonException(
                    StatusCodes.UNAUTHORIZED,
                    'Refresh token was expired. Please make a new sign in request'
                ));

            expect(TokenAutenticacao.destroy).toHaveBeenCalledWith({
                where: { id: storedToken.id }
            });
        });
    });

    describe('validateToken', () => {
        test('deve validar token com sucesso', async () => {
            const result = await AutenticacaoService.validateToken(usuarioFake);

            expect(result).toEqual({
                id: usuarioFake.id,
                nome: usuarioFake.nome,
                email: usuarioFake.email,
                telefone: usuarioFake.telefone,
                endereco: usuarioFake.endereco,
                cursoId: usuarioFake.cursoId,
                cursoNome: usuarioFake.curso.nome,
                instituicaoNome: usuarioFake.curso.instituicao.nome,
                associacaoId: usuarioFake.associacaoId,
                associacaoSigla: usuarioFake.associacao.sigla,
                dataEntradaAssociacao: usuarioFake.dataEntradaAssociacao,
                tipoAcesso: usuarioFake.tipoAcesso,
                situacao: usuarioFake.situacao,
                exigirRedefinicaoSenha: usuarioFake.exigirRedefinicaoSenha,
                fotoUrl: usuarioFake.fotoUrl
            });
        });
    });
}); 