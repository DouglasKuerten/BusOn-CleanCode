'use strict';

const Associacao = require('../models/associacao');
const getFormattedSequelizeExceptions = require('../utils/Exceptions');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');
const fs = require('fs/promises');
const path = require('path');

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
            order: orderClause,
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
        const associacaoBody = req.body.data ? JSON.parse(req.body.data) : req.body;
        const associacaoFiles = req.files;

        const logoUrl = associacaoFiles.logo ? associacaoFiles.logo[0].filename : null;
        const logoDeclaracaoUrl = associacaoFiles.logoDeclaracao ? associacaoFiles.logoDeclaracao[0].filename : null;

        const novaAssociacao = await Associacao.create({ ...associacaoBody, logoUrl, logoDeclaracaoUrl });
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
        const associacaoBody = req.body.data ? JSON.parse(req.body.data) : req.body;
        const associacaoFiles = req.files;

        const logoUrl = associacaoFiles.logo ? associacaoFiles.logo[0].filename : null;
        const logoDeclaracaoUrl = associacaoFiles.logoDeclaracao ? associacaoFiles.logoDeclaracao[0].filename : null;

        const associacaoExistente = await Associacao.findByPk(id);

        const [atualizado] = await Associacao.update({ ...associacaoBody, logoUrl, logoDeclaracaoUrl }, {
            where: { id: id }
        });
        if (atualizado) {
            try {
                if (associacaoExistente.logoUrl) {
                    const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', associacaoExistente.logoUrl);
                    await fs.unlink(caminhoImagemAntiga);
                }
                if (associacaoExistente.logoDeclaracaoUrl) {
                    const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', associacaoExistente.logoDeclaracaoUrl);
                    await fs.unlink(caminhoImagemAntiga);
                }
            } catch (error) {
                console.log(error)
            }
            return res.status(200).json({ message: 'Associação atualizada com sucesso!' });
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
        const associacaoExistente = await Associacao.findByPk(id);
        const excluido = await Associacao.destroy({
            where: { id: id }
        });
        if (excluido) {
            try {
                if (associacaoExistente.logoUrl) {
                    const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', associacaoExistente.logoUrl);
                    await fs.unlink(caminhoImagemAntiga);
                }
            } catch (error) {
                console.log(error)
            }

            return res.status(200).json({ message: 'Associação excluída com sucesso.' });
        }
        throw new Error('Associação não encontrada ou não excluída.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ title: 'Erro ao excluir associação', message: erro.message });

    }
};

module.exports = {
    obterAssociacaoPorId,
    obterTodasAssociacoes,
    criarAssociacao,
    atualizarAssociacao,
    excluirAssociacao
};
