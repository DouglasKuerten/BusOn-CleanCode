'use strict';

const Instituicao = require('../models/instituicao');
const getFormattedSequelizeExceptions = require('../utils/Exceptions');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');
const fs = require('fs/promises');
const path = require('path');

// Controller para obter uma instituição pelo ID
const obterInstituicaoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const instituicao = await Instituicao.findByPk(id);
        if (instituicao) {
            return res.status(200).json(instituicao);
        }
        throw new Error('Instituição não encontrada.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter instituição', error: error.message });
    }
};

// Controller para obter todas as instituições
const obterTodasInstituicoes = async (req, res) => {
    try {
        const whereClause = buildWhereClause(req.query.filters);
        const orderClause = buildOrderByClause(req.query.orderBy)

        const instituicoes = await Instituicao.findAll({
            where: whereClause,
            order: orderClause
        });
        res.status(200).json(instituicoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter todas as instituições', error: error.message });
    }
};

// Controller para criar uma nova instituição
const criarInstituicao = async (req, res) => {
    try {
        const instituicaoBody = req.body.data ? JSON.parse(req.body.data) : req.body;
        const instituicaoFile = req.file;
        const novaInstituicao = await Instituicao.create({ ...instituicaoBody, logoUrl: instituicaoFile?.filename || null });
        res.status(201).json(novaInstituicao);
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ message: 'Erro ao criar nova instituição', error: erro.message });
    }
};

// Controller para atualizar uma instituição existente
const atualizarInstituicao = async (req, res) => {
    try {
        const { id } = req.params;
        const instituicaoBody = req.body.data ? JSON.parse(req.body.data) : req.body;
        const instituicaoFile = req.file;
        const instituicaoExistente = await Instituicao.findByPk(id);

        const [atualizado] = await Instituicao.update({ ...instituicaoBody, logoUrl: instituicaoFile?.filename || null }, {
            where: { id: id }
        });
        if (atualizado) {
            try {
                if (instituicaoExistente.logoUrl) {
                    const caminhoImagemAntiga = path.join(__dirname, '..', '..', 'uploads', instituicaoExistente.logoUrl);
                    await fs.unlink(caminhoImagemAntiga);
                }
            } catch (error) {
                console.log(error)
            }
            return res.status(200).json({ message: 'Instituição atualizada com sucesso!' });
        }
        throw new Error('Instituição não encontrada ou não atualizada.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ message: 'Erro ao atualizar instituição', error: erro.message });
    }
};

// Controller para excluir uma instituição
const excluirInstituicao = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Instituicao.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ message: 'Instituição excluída com sucesso.' });
        }
        throw new Error('Instituição não encontrada ou não excluída.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ message: 'Erro ao excluir instituição', error: erro.message });
    }
};

module.exports = {
    obterInstituicaoPorId,
    obterTodasInstituicoes,
    criarInstituicao,
    atualizarInstituicao,
    excluirInstituicao
};
