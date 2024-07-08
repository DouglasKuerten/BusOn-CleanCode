'use strict';

const { Sequelize } = require('sequelize');
const Associacao = require('../models/associacao');
const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const Pagamento = require('../models/pagamento');
const Usuario = require('../models/usuario');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');
const getFormattedSequelizeExceptions = require('../utils/Exceptions');
const Parametro = require('../models/parametro');

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
                    attributes: ['id', 'nome', 'diasUsoTransporte', 'fotoUrl'],
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
                    [Sequelize.literal('COALESCE(multa, 0) + valor'), 'valorTotal'],
                    [Sequelize.literal('COALESCE(multa, 0)'), 'multa']
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
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ title: 'Erro ao excluir pagamento', message: erro.message });
    }
};

const aprovarPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Pagamento.update({ situacao: 'PAGO', dataPagamento: new Date() }, {
            where: { id: id }
        });
        if (atualizado) {
            return res.status(200).json({ title: 'Pagamento aprovado com sucesso!', message: 'Atualizando pagamentos...' });
        }
        throw new Error('Pagamento não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar pagamento', error: error.message });
    }
};

const reprovarPagamento = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosPagamento = await Pagamento.findByPk(id)
        let dataVencimento = dadosPagamento.dataValues.dataVencimento;

        let situacaoPagamento = 'ABERTO';
        if (dataVencimento < new Date()) {
            situacaoPagamento = 'ATRASADO';
        }

        const [atualizado] = await Pagamento.update({ situacao: situacaoPagamento, dataPagamento: null }, {
            where: { id: id }
        });
        if (atualizado) {
            return res.status(200).json({ title: 'Pagamento reprovado com sucesso!', message: situacaoPagamento === 'ATRASADO' ? 'O valor da multa será aplicada somente no próximo dia' : 'Atualizando pagamentos...' });
        }
        throw new Error('Pagamento não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar pagamento', error: error.message });
    }
};
const gerarPagamentosMensaisManualmente = async (req, res) => {
    try {
        const { associacaoId } = req.body;
        console.log('associacaoId ', associacaoId)
        const parametroPagamento = await Parametro.findOne({ where: { associacaoId: associacaoId } });

        const usuariosPagamento = await Usuario.findAll({
            where: {
                associacaoId: associacaoId,
                situacao: 'ATIVO'
            }
        });

        for (const usuarioPagamento of usuariosPagamento) {
            let valorPagamento = 0;
            switch (usuarioPagamento.dataValues.diasUsoTransporte.length) {
                case 1:
                    valorPagamento = parametroPagamento.dataValues.valor1
                    break;
                case 2:
                    valorPagamento = parametroPagamento.dataValues.valor2
                    break;
                case 3:
                    valorPagamento = parametroPagamento.dataValues.valor3
                    break;
                case 4:
                    valorPagamento = parametroPagamento.dataValues.valor4
                    break;
                case 5:
                    valorPagamento = parametroPagamento.dataValues.valor5
                    break;
                case 6:
                    valorPagamento = parametroPagamento.dataValues.valor6
                    break;
                case 7:
                    valorPagamento = parametroPagamento.dataValues.valor7
                    break;
                default:
                    valorPagamento = 0;
                    break;
            }
            let dataVencimento = new Date(new Date().setDate(parametroPagamento.dataValues.diaVencimento));

            let body = {
                txId: null,
                pixCopiaCola: null,
                usuarioId: usuarioPagamento.dataValues.id,
                tipo: "PIX",
                valor: valorPagamento,
                multa: 0,
                dataVencimento: dataVencimento,
                dataPagamento: null,
                situacao: "ABERTO"
            }
            const novoPagamento = await Pagamento.create(body);
        }
        return res.status(200).json({ title: 'Pagamentos gerados com sucesso!', message: 'Pagamentos gerados com sucesso para todos os usuários da associação' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ title: 'Falha ao gerar pagamentos', message: error.message });
    }
};

module.exports = {
    obterPagamentoPorId,
    obterTodosPagamentos,
    criarPagamento,
    atualizarPagamento,
    excluirPagamento,
    aprovarPagamento,
    reprovarPagamento,
    gerarPagamentosMensaisManualmente
};

