import { describe, expect, jest, test } from '@jest/globals';
import AssociacaoService from '../../services/AssociacaoService.js';
import AssociacaoController from '../../controllers/AssociacaoController.js';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';

describe('AssociacaoController', () => {
  test('obterAssociacaoPorId retorna associação com status 200', async () => {
    const associacaoFake = {
      id: 1,
      nome: 'Testando Ltda',
    };

    jest
      .spyOn(AssociacaoService, 'obterAssociacaoPorId')
      .mockResolvedValue(associacaoFake);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await AssociacaoController.obterAssociacaoPorId(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(associacaoFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('obterTodasAssociacoes retorna lista de associações com status 200', async () => {
    const associacoesFake = [
      { id: 1, nome: 'Associação 1' },
      { id: 2, nome: 'Associação 2' },
    ];

    jest
      .spyOn(AssociacaoService, 'obterTodasAssociacoes')
      .mockResolvedValue(associacoesFake);

    const req = httpMocks.createRequest({
      query: {
        filters: JSON.stringify({ situacao: 'ATIVO' }),
        orderBy: JSON.stringify([['nome', 'ASC']]),
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await AssociacaoController.obterTodasAssociacoes(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(associacoesFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('criarAssociacao cria nova associação com status 201', async () => {
    const novaAssociacao = {
      nome: 'Nova Associação',
      cnpj: '12345678901234',
      sigla: 'NA',
      cidade: 'Test City',
      cep: '12345678',
      uf: 'SP',
      bairro: 'Test',
      endereco: 'Rua Test, 123',
      situacao: 'ATIVO',
    };

    const associacaoCriada = {
      id: 1,
      ...novaAssociacao,
    };

    jest
      .spyOn(AssociacaoService, 'criarAssociacao')
      .mockResolvedValue(associacaoCriada);

    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        data: JSON.stringify(novaAssociacao),
      },
      files: {
        logo: [{ filename: 'logo.png' }],
        logoDeclaracao: [{ filename: 'logo_dec.png' }],
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await AssociacaoController.criarAssociacao(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.CREATED);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(novaAssociacao),
    );

    expect(next).not.toHaveBeenCalled();
  });

  test('atualizarAssociacao atualiza associação existente com status 200', async () => {
    const associacaoAtualizada = {
      id: 1,
      nome: 'Associação Atualizada',
      situacao: 'ATIVO',
    };

    jest
      .spyOn(AssociacaoService, 'atualizarAssociacao')
      .mockResolvedValue(associacaoAtualizada);

    const req = httpMocks.createRequest({
      method: 'PUT',
      params: { id: 1 },
      body: {
        data: JSON.stringify({ nome: 'Associação Atualizada' }),
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await AssociacaoController.atualizarAssociacao(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(associacaoAtualizada);

    expect(next).not.toHaveBeenCalled();
  });

  test('excluirAssociacao remove associação com status 204', async () => {
    jest.spyOn(AssociacaoService, 'excluirAssociacao').mockResolvedValue();

    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await AssociacaoController.excluirAssociacao(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.NO_CONTENT);

    expect(next).not.toHaveBeenCalled();
  });

  test('manipula erro quando serviço falha', async () => {
    const error = new Error('Erro de teste');

    jest
      .spyOn(AssociacaoService, 'obterAssociacaoPorId')
      .mockRejectedValue(error);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await AssociacaoController.obterAssociacaoPorId(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
