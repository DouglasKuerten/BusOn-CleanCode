import { describe, expect, jest, test } from '@jest/globals';
import ParametroService from '../../services/ParametroService.js';
import ParametroController from '../../controllers/ParametroController.js';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';

describe('ParametroController', () => {
  test('obterParametroPorId retorna parâmetro com status 200', async () => {
    const parametroFake = {
      id: 1,
      associacaoId: 1,
      valor1: 50.0,
      valor2: 100.0,
      valor3: 150.0,
      valor4: 200.0,
      valor5: 250.0,
      valor6: 300.0,
      valorMulta: 10.0,
      diaVencimento: 10,
      diasToleranciaMulta: 5,
      liberaAlteracaoDadosPessoais: 'LIBERADO',
      gerarPagamentosAutomatico: 'SIM',
    };

    jest
      .spyOn(ParametroService, 'obterParametroPorId')
      .mockResolvedValue(parametroFake);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.obterParametroPorId(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(parametroFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('obterParametroDaAssociacaoPorId retorna parâmetro da associação com status 200', async () => {
    const parametroFake = {
      id: 1,
      associacaoId: 1,
      valor1: 50.0,
      valor2: 100.0,
      valor3: 150.0,
      valor4: 200.0,
      valor5: 250.0,
      valor6: 300.0,
      valorMulta: 10.0,
      diaVencimento: 10,
      diasToleranciaMulta: 5,
      liberaAlteracaoDadosPessoais: 'LIBERADO',
      gerarPagamentosAutomatico: 'SIM',
    };

    jest
      .spyOn(ParametroService, 'obterParametroDaAssociacaoPorId')
      .mockResolvedValue(parametroFake);

    const req = httpMocks.createRequest({
      params: { associacaoId: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.obterParametroDaAssociacaoPorId(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(parametroFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('obterTodosParametros retorna lista de parâmetros com status 200', async () => {
    const parametrosFake = [
      {
        id: 1,
        associacaoId: 1,
        valor1: 50.0,
        valorMulta: 10.0,
        diaVencimento: 10,
        liberaAlteracaoDadosPessoais: 'LIBERADO',
      },
      {
        id: 2,
        associacaoId: 2,
        valor1: 60.0,
        valorMulta: 15.0,
        diaVencimento: 15,
        liberaAlteracaoDadosPessoais: 'BLOQUEADO',
      },
    ];

    jest
      .spyOn(ParametroService, 'listarTodosParametros')
      .mockResolvedValue(parametrosFake);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.obterTodosParametros(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(parametrosFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('criarParametro cria novo parâmetro com status 201', async () => {
    const novoParametro = {
      associacaoId: 1,
      valor1: 50.0,
      valor2: 100.0,
      valor3: 150.0,
      valor4: 200.0,
      valor5: 250.0,
      valor6: 300.0,
      valorMulta: 10.0,
      diaVencimento: 10,
      diasToleranciaMulta: 5,
      liberaAlteracaoDadosPessoais: 'LIBERADO',
      gerarPagamentosAutomatico: 'SIM',
    };

    const parametroCriado = {
      id: 1,
      ...novoParametro,
    };

    jest
      .spyOn(ParametroService, 'criarParametro')
      .mockResolvedValue(parametroCriado);

    const req = httpMocks.createRequest({
      method: 'POST',
      body: novoParametro,
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.criarParametro(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.CREATED);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(novoParametro),
    );

    expect(next).not.toHaveBeenCalled();
  });

  test('atualizarParametro atualiza parâmetro existente com status 200', async () => {
    const parametroAtualizado = {
      id: 1,
      associacaoId: 1,
      valor1: 55.0,
      valorMulta: 12.0,
      diaVencimento: 15,
      liberaAlteracaoDadosPessoais: 'BLOQUEADO',
      gerarPagamentosAutomatico: 'NAO',
    };

    jest
      .spyOn(ParametroService, 'atualizarParametro')
      .mockResolvedValue(parametroAtualizado);

    const req = httpMocks.createRequest({
      method: 'PUT',
      params: { id: 1 },
      body: parametroAtualizado,
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.atualizarParametro(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(parametroAtualizado);

    expect(next).not.toHaveBeenCalled();
  });

  test('excluirParametro remove parâmetro com status 204', async () => {
    jest.spyOn(ParametroService, 'excluirParametro').mockResolvedValue(true);

    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.excluirParametro(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.NO_CONTENT);

    expect(next).not.toHaveBeenCalled();
  });

  test('manipula erro quando serviço falha', async () => {
    const error = new Error('Erro de teste');

    jest
      .spyOn(ParametroService, 'obterParametroPorId')
      .mockRejectedValue(error);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.obterParametroPorId(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test('manipula erro quando parâmetro da associação não é encontrado', async () => {
    const error = new Error('Parâmetros da associação não foram encontrados!');

    jest
      .spyOn(ParametroService, 'obterParametroDaAssociacaoPorId')
      .mockRejectedValue(error);

    const req = httpMocks.createRequest({
      params: { associacaoId: 999 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await ParametroController.obterParametroDaAssociacaoPorId(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
