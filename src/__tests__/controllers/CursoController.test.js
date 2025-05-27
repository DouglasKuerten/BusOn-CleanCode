import { describe, expect, jest, test } from '@jest/globals';
import CursoService from '../../services/CursoService.js';
import CursoController from '../../controllers/CursoController.js';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';

process.env.NODE_ENV = 'test';

describe('CursoController', () => {
  test('obterCursoPorId retorna curso com status 200', async () => {
    const cursoFake = {
      id: 1,
      nome: 'Engenharia de Software',
      situacao: 'ATIVO',
      instituicaoId: 1,
    };

    jest.spyOn(CursoService, 'obterCursoPorId').mockResolvedValue(cursoFake);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.obterCursoPorId(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(cursoFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('obterTodosCursos retorna lista de cursos com status 200', async () => {
    const cursosFake = [
      {
        id: 1,
        nome: 'Engenharia de Software',
        situacao: 'ATIVO',
        instituicaoId: 1,
        instituicao: {
          id: 1,
          nome: 'Faculdade Teste',
        },
      },
      {
        id: 2,
        nome: 'Ciência da Computação',
        situacao: 'ATIVO',
        instituicaoId: 1,
        instituicao: {
          id: 1,
          nome: 'Faculdade Teste',
        },
      },
    ];

    jest.spyOn(CursoService, 'obterTodosCursos').mockResolvedValue(cursosFake);

    const req = httpMocks.createRequest({
      query: {
        filters: JSON.stringify({ situacao: 'ATIVO' }),
        orderBy: JSON.stringify([['nome', 'ASC']]),
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.obterTodosCursos(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(cursosFake);

    expect(next).not.toHaveBeenCalled();
  });

  test('criarCurso cria novo curso com status 201', async () => {
    const novoCurso = {
      nome: 'Novo Curso',
      situacao: 'ATIVO',
      instituicaoId: 1,
    };

    const cursoCriado = {
      id: 1,
      ...novoCurso,
    };

    jest.spyOn(CursoService, 'criarCurso').mockResolvedValue(cursoCriado);

    const req = httpMocks.createRequest({
      method: 'POST',
      body: novoCurso,
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.criarCurso(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.CREATED);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining(novoCurso),
    );

    expect(next).not.toHaveBeenCalled();
  });

  test('atualizarCurso atualiza curso existente com status 200', async () => {
    const cursoAtualizado = {
      id: 1,
      nome: 'Curso Atualizado',
      situacao: 'ATIVO',
      instituicaoId: 1,
    };

    jest
      .spyOn(CursoService, 'atualizarCurso')
      .mockResolvedValue(cursoAtualizado);

    const req = httpMocks.createRequest({
      method: 'PUT',
      params: { id: 1 },
      body: {
        nome: 'Curso Atualizado',
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.atualizarCurso(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    expect(JSON.parse(res._getData())).toEqual(cursoAtualizado);

    expect(next).not.toHaveBeenCalled();
  });

  test('excluirCurso remove curso com status 204', async () => {
    jest.spyOn(CursoService, 'excluirCurso').mockResolvedValue();

    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.excluirCurso(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.NO_CONTENT);

    expect(next).not.toHaveBeenCalled();
  });

  test('manipula erro quando serviço falha', async () => {
    const error = new Error('Erro de teste');

    jest.spyOn(CursoService, 'obterCursoPorId').mockRejectedValue(error);

    const req = httpMocks.createRequest({
      params: { id: 1 },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.obterCursoPorId(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test('obterTodosCursos inclui dados da instituição', async () => {
    const cursoComInstituicao = {
      id: 1,
      nome: 'Engenharia de Software',
      situacao: 'ATIVO',
      instituicaoId: 1,
      instituicao: {
        id: 1,
        nome: 'Faculdade Teste',
      },
    };

    jest
      .spyOn(CursoService, 'obterTodosCursos')
      .mockResolvedValue([cursoComInstituicao]);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();

    await CursoController.obterTodosCursos(req, res, next);

    expect(res._getStatusCode()).toBe(StatusCodes.OK);

    const responseData = JSON.parse(res._getData());

    expect(responseData).toEqual([cursoComInstituicao]);

    expect(responseData[0]).toHaveProperty('instituicao');

    expect(responseData[0].instituicao).toHaveProperty('nome');

    expect(next).not.toHaveBeenCalled();
  });
});
