import { describe, expect, jest, test } from '@jest/globals';
import { StatusCodes } from 'http-status-codes';
import Curso from '../../models/Curso.js';
import Instituicao from '../../models/Instituicao.js';
import CursoService from '../../services/CursoService.js';

describe('CursoService', () => {
  test('obterCursoPorId retorna curso quando encontrado', async () => {
    const cursoFake = {
      id: 1,
      nome: 'Engenharia de Software',
      situacao: 'ATIVO',
      instituicaoId: 1,
    };

    jest.spyOn(Curso, 'findByPk').mockResolvedValue(cursoFake);

    await expect(CursoService.obterCursoPorId(1)).resolves.toEqual(cursoFake);
  });

  test('obterCursoPorId lança erro quando curso não encontrado', async () => {
    jest.spyOn(Curso, 'findByPk').mockResolvedValue(null);

    await expect(CursoService.obterCursoPorId(1)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Curso não encontrado.',
      }),
    );
  });

  /* test('obterTodosCursos retorna lista de cursos com instituições', async () => {
        const cursosFake = [
            {
                id: 1,
                nome: 'Engenharia de Software',
                situacao: 'ATIVO',
                instituicao: {
                    id: 1,
                    nome: 'Faculdade Teste'
                }
            }
        ];

        const query = {
            filters: { situacao: 'ATIVO' },
            orderBy: [['nome', 'ASC']]
        };

        jest.spyOn(Curso, 'findAll')
            .mockResolvedValue(cursosFake);

        await expect(CursoService.obterTodosCursos(query))
            .resolves
            .toEqual(cursosFake);

        expect(Curso.findAll)
            .toHaveBeenCalledWith(expect.objectContaining({
                include: [
                    expect.objectContaining({
                        model: Instituicao,
                        attributes: ['id', 'nome']
                    })
                ],
                attributes: ['id', 'nome', 'situacao']
            }));
    }); */

  test('validarInstituicao passa quando instituição existe', async () => {
    const instituicaoFake = {
      id: 1,
      nome: 'Faculdade Teste',
    };

    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue(instituicaoFake);

    await expect(CursoService.validarInstituicao(1)).resolves.not.toThrow();
  });

  test('validarInstituicao lança erro quando instituição não existe', async () => {
    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue(null);

    await expect(CursoService.validarInstituicao(999)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'A instituição informada não existe.',
      }),
    );
  });

  test('criarCurso cria novo curso com sucesso', async () => {
    const novoCurso = {
      nome: 'Novo Curso',
      situacao: 'ATIVO',
      instituicaoId: 1,
    };

    const cursoCriado = {
      id: 1,
      ...novoCurso,
    };

    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue({ id: 1 });

    jest.spyOn(Curso, 'create').mockResolvedValue(cursoCriado);

    await expect(CursoService.criarCurso(novoCurso)).resolves.toEqual(
      cursoCriado,
    );

    expect(Curso.create).toHaveBeenCalledWith(novoCurso);
  });

  test('atualizarCurso atualiza curso existente', async () => {
    const id = 1;
    const dadosAtualizacao = {
      nome: 'Curso Atualizado',
      situacao: 'ATIVO',
      instituicaoId: 1,
    };

    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue({ id: 1 });

    jest.spyOn(Curso, 'update').mockResolvedValue([1]);

    jest
      .spyOn(Curso, 'findByPk')
      .mockResolvedValue({ id, ...dadosAtualizacao });

    await expect(
      CursoService.atualizarCurso(id, dadosAtualizacao),
    ).resolves.toEqual(expect.objectContaining(dadosAtualizacao));

    expect(Curso.update).toHaveBeenCalledWith(
      dadosAtualizacao,
      expect.objectContaining({ where: { id } }),
    );
  });

  test('excluirCurso remove curso com sucesso', async () => {
    jest.spyOn(Curso, 'destroy').mockResolvedValue(1);

    await expect(CursoService.excluirCurso(1)).resolves.not.toThrow();

    expect(Curso.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('excluirCurso lança erro quando curso não encontrado', async () => {
    jest.spyOn(Curso, 'destroy').mockResolvedValue(0);

    await expect(CursoService.excluirCurso(999)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Curso não encontrado.',
      }),
    );
  });
});
