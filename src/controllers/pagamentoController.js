'use strict';

const Pagamento = require('../models/pagamento');

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
        return res.status(500).json({ mensagem: 'Erro ao obter pagamento', error: error.message });
    }
};

// Controller para obter todos os pagamentos
const obterTodosPagamentos = async (req, res) => {
    try {
        const pagamentos = await Pagamento.findAll();
        res.status(200).json(pagamentos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao obter todos os pagamentos', error: error.message });
    }
};

// Controller para criar um novo pagamento
const criarPagamento = async (req, res) => {
    try {
        const novoPagamento = await Pagamento.create(req.body);
        res.status(201).json(novoPagamento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar novo pagamento', error: error.message });
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
        res.status(500).json({ mensagem: 'Erro ao atualizar pagamento', error: error.message });
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
            return res.status(200).json({ mensagem: 'Pagamento excluído com sucesso.' });
        }
        throw new Error('Pagamento não encontrado ou não excluído.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao excluir pagamento', error: error.message });
    }
};

module.exports = {
    obterPagamentoPorId,
    obterTodosPagamentos,
    criarPagamento,
    atualizarPagamento,
    excluirPagamento
};
