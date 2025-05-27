'use strict';

import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import BusonException from '../exceptions/BusonException.js';
import SequelizeException from '../exceptions/SequelizeException.js';
import { StatusCodes } from 'http-status-codes';
import cursoSchema from '../validators/CursoSchema.js';
import CursoQueryBuilder from '../queryBuilder/CursoQueryBuilder.js';

class CursoService {
  async obterCursoPorId(id) {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Curso não encontrado.');
    }
    return curso;
  }

  async obterTodosCursos(query) {
    return await new CursoQueryBuilder()
      .withInstituicao()
      .withFiltros(query.filters)
      .withOrdenacao(query.orderBy)
      .selectCampos(['id', 'nome', 'situacao'])
      .findAll();
  }

  async validarInstituicao(instituicaoId) {
    const instituicao = await Instituicao.findByPk(instituicaoId);
    if (!instituicao) {
      throw new BusonException(
        StatusCodes.BAD_REQUEST,
        'A instituição informada não existe.',
      );
    }
  }

  async criarCurso(dados) {
    await cursoSchema.validate(dados);
    await this.validarInstituicao(dados.instituicaoId);
    return await Curso.create(dados);
  }

  async atualizarCurso(id, dados) {
    await cursoSchema.validate(dados);
    await this.validarInstituicao(dados.instituicaoId);
    const [atualizado] = await Curso.update(dados, { where: { id } });
    if (!atualizado) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Curso não encontrado.');
    }
    return await this.obterCursoPorId(id);
  }

  async excluirCurso(id) {
    try {
      const excluido = await Curso.destroy({ where: { id } });
      if (!excluido) {
        throw new BusonException(
          StatusCodes.NOT_FOUND,
          'Curso não encontrado.',
        );
      }
    } catch (error) {
      if (error.name && error.name.startsWith('Sequelize')) {
        throw new SequelizeException(error);
      }
      throw error;
    }
  }
}

export default new CursoService();
