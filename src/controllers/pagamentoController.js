'use strict';

const { Sequelize } = require('sequelize');
const Associacao = require('../models/associacao');
const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const Pagamento = require('../models/pagamento');
const Usuario = require('../models/usuario');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');

// Controller para obter um pagamento pelo ID
const obterPagamentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pagamento = await Pagamento.findByPk(id);
        if (pagamento) {
            return res.status(200).json(pagamento);
        }
        throw new Error('Pagamento não encontrado.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter pagamento', error: error.message });
    }
};

// Controller para obter todos os pagamentos
const obterTodosPagamentos = async (req, res) => {
    try {
        const { filters, filtersAssociacao } = req.query
        const whereClause = buildWhereClause(filters);
        const whereClauseAssociacao = buildWhereClause(filtersAssociacao);

        const pagamentos = await Pagamento.findAll({
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nome', 'diasUsoTransporte'],
                    include: [{
                        model: Associacao,
                        attributes: ['id', 'nome'],
                        where: whereClauseAssociacao,
                        required: true
                    },
                    {
                        model: Curso,
                        attributes: ['id', 'nome'],
                        include: [{
                            model: Instituicao,
                            attributes: ['id', 'nome'],
                        }]
                    }],
                    required: true
                }
            ],
            attributes: {
                include: [
                    [Sequelize.literal('multa + valor'), 'valorTotal']
                ]
            },
            where: whereClause,
            order: [
                [Sequelize.literal("CASE WHEN pagamento.situacao = 'ATRASADO' THEN 1 WHEN pagamento.situacao = 'ABERTO' THEN 2 WHEN pagamento.situacao = 'PAGO' THEN 3 ELSE 4 END"), 'ASC'],
                [Sequelize.literal('DATE_TRUNC(\'day\', "pagamento"."data_vencimento")'), 'DESC'], // Ordena pela data truncada
                [Sequelize.literal('"usuario"."nome"'), 'ASC'] // Ordena pelo nome do usuário
            ]
        });
        res.status(200).json(pagamentos);
    } catch (error) {
        console.error(error.response);
        res.status(500).json({ message: 'Erro ao obter todos os pagamentos', error: error.message });
    }
};

// Controller para criar um novo pagamento
const criarPagamento = async (req, res) => {
    try {
        const novoPagamento = await Pagamento.create(req.body);
        res.status(201).json(novoPagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar novo pagamento', error: error.message });
    }
};

// Controller para atualizar um pagamento existente
const atualizarPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Pagamento.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const pagamentoAtualizado = await Pagamento.findByPk(id);
            return res.status(200).json(pagamentoAtualizado);
        }
        throw new Error('Pagamento não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar pagamento', error: error.message });
    }
};

// Controller para excluir um pagamento
const excluirPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Pagamento.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ message: 'Pagamento excluído com sucesso.' });
        }
        throw new Error('Pagamento não encontrado ou não excluído.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir pagamento', error: error.message });
    }
};

module.exports = {
    obterPagamentoPorId,
    obterTodosPagamentos,
    criarPagamento,
    atualizarPagamento,
    excluirPagamento
};

