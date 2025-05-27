'use strict';

import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import BusonException from '../exceptions/BusonException.js';
import SequelizeException from '../exceptions/SequelizeException.js';
import { StatusCodes } from 'http-status-codes';
import cursoSchema from '../validators/CursoSchema.js';

class CursoService {
    async obterCursoPorId(id) {
        const curso = await Curso.findByPk(id);
        if (!curso) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'Curso não encontrado.');
        }
        return curso;
    }

    async obterTodosCursos(query) {
        try {
            const whereClause = buildWhereClause(query.filters);
            const orderClause = buildOrderByClause(query.orderBy);

            return await Curso.findAll({
                include: [{
                    model: Instituicao,
                    attributes: ['id', 'nome']
                }],
                attributes: ['id', 'nome', 'situacao'],
                where: whereClause,
                order: orderClause
            });
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Filtros inválidos para buscar cursos.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }

    async validarInstituicao(instituicaoId) {
        const instituicao = await Instituicao.findByPk(instituicaoId);
        if (!instituicao) {
            throw new BusonException(
                StatusCodes.BAD_REQUEST,
                'A instituição informada não existe.'
            );
        }
    }

    async criarCurso(dados) {
        try {
            await cursoSchema.validate(dados, { abortEarly: false });

            await this.validarInstituicao(dados.instituicaoId);

            return await Curso.create(dados);
        } catch (error) {
            if (error instanceof BusonException) {
                throw error;
            }
            if (error.name === 'ValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    error.errors.join(', ')
                );
            }
            if (error.name === 'SequelizeValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Dados inválidos para criar o curso.'
                );
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'A instituição informada não existe.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }

    async atualizarCurso(id, dados) {
        try {

            await cursoSchema.validate(dados, { abortEarly: false });

            if (dados.instituicaoId) {
                await this.validarInstituicao(dados.instituicaoId);
            }

            const [atualizado] = await Curso.update(dados, {
                where: { id }
            });

            if (!atualizado) {
                throw new BusonException(StatusCodes.NOT_FOUND, 'Curso não encontrado.');
            }

            return await this.obterCursoPorId(id);
        } catch (error) {
            if (error instanceof BusonException) {
                throw error;
            }
            if (error.name === 'ValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    error.errors.join(', ')
                );
            }
            if (error.name === 'SequelizeValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Dados inválidos para atualizar o curso.'
                );
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'A instituição informada não existe.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }

    async excluirCurso(id) {
        try {
            const excluido = await Curso.destroy({ where: { id } });
            if (!excluido) {
                throw new BusonException(StatusCodes.NOT_FOUND, 'Curso não encontrado.');
            }
        } catch (error) {
            if (error instanceof BusonException) {
                throw error;
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new BusonException(
                    StatusCodes.CONFLICT,
                    'Não é possível excluir o curso porque existem registros vinculados a ele.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }
}

export default new CursoService(); 