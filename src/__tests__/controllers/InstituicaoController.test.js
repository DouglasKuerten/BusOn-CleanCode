import { describe, expect, jest, test } from '@jest/globals';
import InstituicaoService from '../../services/InstituicaoService.js';
import InstituicaoController from '../../controllers/InstituicaoController.js';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';

describe('InstituicaoController', () => {
  test('obterInstituicaoPorId retorna instituição com status 200', async () => {
    const instituicaoFake = {
      id: 1,
      nome: 'Escola Teste',
      endereco: 'Rua Teste, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
    };

    jest
      .spyOn(InstituicaoService, 'obterInstituicaoPorId')
      .mockResolvedValue(instituicaoFake);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await InstituicaoController.obterInstituicaoPorId(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(instituicaoFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('obterTodasInstituicoes retorna lista de instituições com status 200', async () => {
    const instituicoesFake = [
      {
        id: 1,
        nome: 'Escola 1',
        endereco: 'Endereço 1',
        situacao: 'ATIVO',
        associacaoId: 1,
      },
      {
        id: 2,
        nome: 'Escola 2',
        endereco: 'Endereço 2',
        situacao: 'ATIVO',
        associacaoId: 1,
      },
    ];

    jest
      .spyOn(InstituicaoService, 'obterTodasInstituicoes')
      .mockResolvedValue(instituicoesFake);

    const req = httpMocks.createRequest({
      query: {
        filters: JSON.stringify({ situacao: 'ATIVO' }),
        orderBy: JSON.stringify([['nome', 'ASC']]),
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await InstituicaoController.obterTodasInstituicoes(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(instituicoesFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('criarInstituicao cria nova instituição com status 201', async () => {
    const novaInstituicao = {
      nome: 'Nova Escola',
      endereco: 'Rua Nova, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
    };

    const instituicaoCriada = {
      id: 1,
      ...novaInstituicao,
    };

    jest
      .spyOn(InstituicaoService, 'criarInstituicao')
      .mockResolvedValue(instituicaoCriada);

    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        data: JSON.stringify(novaInstituicao),
      },
      file: {
        filename: 'logo.png',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await InstituicaoController.criarInstituicao(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.CREATED);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(novaInstituicao),
    );

    expect(next).not.toHaveBeenCalled();
  });

  test('atualizarInstituicao atualiza instituição existente com status 200', async () => {
    const instituicaoAtualizada = {
      id: 1,
      nome: 'Escola Atualizada',
      endereco: 'Rua Atualizada, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
    };

    jest
      .spyOn(InstituicaoService, 'atualizarInstituicao')
      .mockResolvedValue(instituicaoAtualizada);

    const req = httpMocks.createRequest({
      method: 'PUT',
      params: { id: 1 },
      body: {
        data: JSON.stringify({ nome: 'Escola Atualizada' }),
      },
      file: {
        filename: 'nova_logo.png',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await InstituicaoController.atualizarInstituicao(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(instituicaoAtualizada);

    expect(next).not.toHaveBeenCalled();
  });

  test('excluirInstituicao remove instituição com status 204', async () => {
    jest.spyOn(InstituicaoService, 'excluirInstituicao').mockResolvedValue();

    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await InstituicaoController.excluirInstituicao(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.NO_CONTENT);

    expect(next).not.toHaveBeenCalled();
  });

  test('manipula erro quando serviço falha', async () => {
    const error = new Error('Erro de teste');

    jest
      .spyOn(InstituicaoService, 'obterInstituicaoPorId')
      .mockRejectedValue(error);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await InstituicaoController.obterInstituicaoPorId(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
