import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import AutenticacaoController from '../../controllers/AutenticacaoController.js';
import AutenticacaoService from '../../services/AutenticacaoService.js';
import { StatusCodes } from 'http-status-codes';
import TipoAcessoEnum from '../../enum/TIpoAcessoEnum.js';
import AtivoInativoEnum from '../../enum/AtivoInativoEnum.js';

describe('AutenticacaoController', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  const usuarioAutenticado = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '11999999999',
    endereco: 'Rua Teste, 123',
    cursoId: 1,
    cursoNome: 'Curso Teste',
    instituicaoNome: 'Instituição Teste',
    associacaoId: 1,
    associacaoSigla: 'ASSOC',
    dataEntradaAssociacao: new Date(),
    tipoAcesso: TipoAcessoEnum.ASSOCIADO,
    situacao: AtivoInativoEnum.ATIVO,
    accessToken: 'access_token_test',
    refreshToken: 'refresh_token_test',
    exigirRedefinicaoSenha: false,
    fotoUrl: 'foto.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticateUsuario', () => {
    test('deve autenticar usuário com sucesso', async () => {
      const req = {
        body: {
          email: 'joao@example.com',
          senha: 'senha123',
        },
      };
      const res = mockResponse();

      jest
        .spyOn(AutenticacaoService, 'login')
        .mockResolvedValue(usuarioAutenticado);

      await AutenticacaoController.authenticateUsuario(req, res, mockNext);

      expect(AutenticacaoService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(usuarioAutenticado);
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve chamar next com erro quando autenticação falha', async () => {
      const req = {
        body: {
          email: 'joao@example.com',
          senha: 'senha_incorreta',
        },
      };
      const res = mockResponse();
      const error = new Error('Falha na autenticação');

      jest.spyOn(AutenticacaoService, 'login').mockRejectedValue(error);

      await AutenticacaoController.authenticateUsuario(req, res, mockNext);

      expect(AutenticacaoService.login).toHaveBeenCalledWith(req.body);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('refreshToken', () => {
    const tokenResponse = {
      accessToken: 'new_access_token',
      refreshToken: 'refresh_token_test',
    };

    test('deve renovar token com sucesso', async () => {
      const req = {
        body: {
          refreshToken: 'refresh_token_test',
        },
      };
      const res = mockResponse();

      jest
        .spyOn(AutenticacaoService, 'refreshToken')
        .mockResolvedValue(tokenResponse);

      await AutenticacaoController.refreshToken(req, res, mockNext);

      expect(AutenticacaoService.refreshToken).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(tokenResponse);
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve chamar next com erro quando renovação de token falha', async () => {
      const req = {
        body: {
          refreshToken: 'invalid_refresh_token',
        },
      };
      const res = mockResponse();
      const error = new Error('Token inválido');

      jest.spyOn(AutenticacaoService, 'refreshToken').mockRejectedValue(error);

      await AutenticacaoController.refreshToken(req, res, mockNext);

      expect(AutenticacaoService.refreshToken).toHaveBeenCalledWith(req.body);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('validateToken', () => {
    test('deve validar token com sucesso', async () => {
      const req = {
        user: {
          dataValues: usuarioAutenticado,
        },
      };
      const res = mockResponse();

      jest
        .spyOn(AutenticacaoService, 'validateToken')
        .mockResolvedValue(usuarioAutenticado);

      await AutenticacaoController.validateToken(req, res, mockNext);

      expect(AutenticacaoService.validateToken).toHaveBeenCalledWith(
        req.user.dataValues,
      );
      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(usuarioAutenticado);
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve chamar next com erro quando validação de token falha', async () => {
      const req = {
        user: {
          dataValues: usuarioAutenticado,
        },
      };
      const res = mockResponse();
      const error = new Error('Falha na validação do token');

      jest.spyOn(AutenticacaoService, 'validateToken').mockRejectedValue(error);

      await AutenticacaoController.validateToken(req, res, mockNext);

      expect(AutenticacaoService.validateToken).toHaveBeenCalledWith(
        req.user.dataValues,
      );
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
