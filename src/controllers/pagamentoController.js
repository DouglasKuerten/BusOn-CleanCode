'use strict';

const Associacao = require('../models/associacao');
const Pagamento = require('../models/pagamento');
const Parametro = require('../models/parametro');
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
        const orderClause = buildOrderByClause(req.query.orderBy)

        const pagamentos = await Pagamento.findAll({
            include: [
                {
                    model: Usuario,
                    attributes: ['id', 'nome'],
                    include: [{
                        model: Associacao,
                        attributes: ['id', 'nome'],
                        where: whereClauseAssociacao,
                        required: true
                    }],
                    required: true
                }
            ],
            where: whereClause,
            order: orderClause
        });
        console.log(whereClause);
        console.log(whereClauseAssociacao);
        res.status(200).json(pagamentos);
    } catch (error) {
        console.error(error);
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

// Controller para gerar as cobranças do mes automaticamente
const gerarPagamentosMensais = async (req, res) => {
    try {
        const parametrosPagamento = await Parametro.findAll();

        for (const parametroPagamento of parametrosPagamento) {

            const usuariosPagamento = await Usuario.findAll({
                where: { associacaoId: parametroPagamento.dataValues.associacaoId }
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
                    tipo: "PIX_AUTOMATICO",
                    valor: valorPagamento,
                    multa: 0,
                    dataVencimento: dataVencimento,
                    dataPagamento: null,
                    situacao: "ABERTO"
                }

                const novoPagamento = await Pagamento.create(body);

            }

        }


        res.status(201).json({ message: 'Pagamentos gerados para todos os usuários! ' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar novo pagamento', error: error.message });
    }
};

module.exports = {
    obterPagamentoPorId,
    obterTodosPagamentos,
    criarPagamento,
    atualizarPagamento,
    excluirPagamento,
    gerarPagamentosMensais
};

