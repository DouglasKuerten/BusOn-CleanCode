'use strict';

const Instituicao = require('../models/instituicao');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');
const BusonException = require('../exceptions/BusonException');
const SequelizeException = require('../exceptions/SequelizeException');
const { StatusCodes } = require('http-status-codes');
const fs = require('fs/promises');
const path = require('path');
const instituicaoSchema = require('../validators/InstituicaoSchema');

class InstituicaoService {
    async obterInstituicaoPorId(id) {
        const instituicao = await Instituicao.findByPk(id);
        if (!instituicao) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'Instituição não encontrada.');
        }
        return instituicao;
    }

    async obterTodasInstituicoes(query) {
        try {
            const whereClause = buildWhereClause(query.filters);
            const orderClause = buildOrderByClause(query.orderBy);

            return await Instituicao.findAll({
                where: whereClause,
                order: orderClause
            });
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Filtros inválidos para buscar instituições.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }

    async criarInstituicao(dados, arquivo) {
        try {
            const instituicaoBody = dados.data ? JSON.parse(dados.data) : dados;

            await instituicaoSchema.validate(instituicaoBody, { abortEarly: false });

            return await Instituicao.create({
                ...instituicaoBody,
                logoUrl: arquivo?.filename || null
            });
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
            if (error.name === 'SyntaxError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Dados da instituição em formato inválido.'
                );
            }
            if (error.name === 'SequelizeValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Dados inválidos para criar a instituição.'
                );
            }
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new BusonException(
                    StatusCodes.CONFLICT,
                    'Já existe uma instituição com este nome.'
                );
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Não foi possível criar a instituição. Associação não encontrada.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }

    async atualizarInstituicao(id, dados, arquivo) {
        try {
            const instituicaoBody = dados.data ? JSON.parse(dados.data) : dados;

            await instituicaoSchema.validate(instituicaoBody, { abortEarly: false });

            const instituicaoExistente = await this.obterInstituicaoPorId(id);

            const [atualizado] = await Instituicao.update(
                { ...instituicaoBody, logoUrl: arquivo?.filename || instituicaoExistente.logoUrl },
                { where: { id } }
            );

            if (atualizado) {
                if (arquivo?.filename && instituicaoExistente.logoUrl) {
                    try {
                        const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', instituicaoExistente.logoUrl);
                        await fs.unlink(caminhoImagemAntiga);
                    } catch (error) {
                        console.error('Erro ao excluir imagem antiga:', error);
                    }
                }
                return await this.obterInstituicaoPorId(id);
            }
            throw new BusonException(StatusCodes.INTERNAL_SERVER_ERROR, 'Falha ao atualizar instituição.');
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
            if (error.name === 'SyntaxError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Dados da instituição em formato inválido.'
                );
            }
            if (error.name === 'SequelizeValidationError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Dados inválidos para atualizar a instituição.'
                );
            }
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new BusonException(
                    StatusCodes.CONFLICT,
                    'Já existe uma instituição com este nome.'
                );
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Não foi possível criar a instituição. Associação não encontrada.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }

    async excluirInstituicao(id) {
        try {
            const instituicao = await this.obterInstituicaoPorId(id);
            const excluido = await Instituicao.destroy({ where: { id } });

            if (excluido) {
                if (instituicao.logoUrl) {
                    try {
                        const caminhoImagem = path.join(__dirname, '..', '..', 'uploads', instituicao.logoUrl);
                        await fs.unlink(caminhoImagem);
                    } catch (error) {
                        console.error('Erro ao excluir logo da instituição:', error);
                    }
                }
                return;
            }
            throw new BusonException(StatusCodes.NOT_FOUND, 'Instituição não encontrada.');
        } catch (error) {
            if (error instanceof BusonException) {
                throw error;
            }
            if (error.name === 'SequelizeForeignKeyConstraintError') {
                throw new BusonException(
                    StatusCodes.BAD_REQUEST,
                    'Não pode excluir porque há registros dependentes na tabela instituicaos.'
                );
            }
            if (error.name && error.name.startsWith('Sequelize')) {
                throw new SequelizeException(error);
            }
            throw error;
        }
    }
}

module.exports = new InstituicaoService(); 