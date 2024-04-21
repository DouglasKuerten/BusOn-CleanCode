'use strict';

const Associacao = require('../models/associacao');
const getFormattedSequelizeExceptions = require('../utils/Exceptions');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');

// Controller para obter uma associação pelo ID
const obterAssociacaoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const associacao = await Associacao.findByPk(id);
        if (associacao) {
            return res.status(200).json(associacao);
        }
        throw new Error('Associação não encontrada.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter associação', error: error.message });
    }
};

// Controller para obter todas as associações
const obterTodasAssociacoes = async (req, res) => {
    try {
        const whereClause = buildWhereClause(req.query.filters);
        const orderClause = buildOrderByClause(req.query.orderBy)

        const associacoes = await Associacao.findAll({
            where: whereClause,
            order: orderClause
        });
        res.status(200).json(associacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter todas as associações', error: error.message });
    }
};

// Controller para criar uma nova associação
const criarAssociacao = async (req, res) => {
    try {
        const novaAssociacao = await Associacao.create(req.body);
        res.status(201).json(novaAssociacao);
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ message: 'Erro ao criar nova associação', error: erro.message });
    }
};

// Controller para atualizar uma associação existente
const atualizarAssociacao = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Associacao.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const associacaoAtualizada = await Associacao.findByPk(id);
            return res.status(200).json(associacaoAtualizada);
        }
        throw new Error('Associação não encontrada ou não atualizada.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ message: 'Erro ao atualizar associação', error: erro.message });
    }
};

// Controller para excluir uma associação
const excluirAssociacao = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Associacao.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ message: 'Associação excluída com sucesso.' });
        }
        throw new Error('Associação não encontrada ou não excluída.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ message: 'Erro ao excluir associação', error: erro.message });
    }
};

module.exports = {
    obterAssociacaoPorId,
    obterTodasAssociacoes,
    criarAssociacao,
    atualizarAssociacao,
    excluirAssociacao
};
