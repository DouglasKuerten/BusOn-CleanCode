'use strict';

const Parametro = require('../models/parametro');

// Controller para obter um parâmetro pelo ID
const obterParametroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const parametro = await Parametro.findByPk(id);
        if (parametro) {
            return res.status(200).json(parametro);
        }
        throw new Error('Parâmetro não encontrado.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter parâmetro', error: error.message });
    }
};
// Controller para obter um parâmetro pelo ID
const obterParametroDaAssociacao = async (req, res) => {
    try {
        const { associacaoId } = req.params;
        const parametro = await Parametro.findOne({ where: { associacaoId: associacaoId } });
        if (parametro) {
            return res.status(200).json(parametro);
        }
        throw new Error('Parâmetro não encontrado.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter parâmetro', error: error.message });
    }
};

// Controller para obter todos os parâmetros
const obterTodosParametros = async (req, res) => {
    try {
        const parametros = await Parametro.findAll();
        res.status(200).json(parametros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter todos os parâmetros', error: error.message });
    }
};

// Controller para criar um novo parâmetro
const criarParametro = async (req, res) => {
    try {
        const novoParametro = await Parametro.create(req.body);
        res.status(201).json(novoParametro);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar novo parâmetro', error: error.message });
    }
};

// Controller para atualizar um parâmetro existente
const atualizarParametro = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Parametro.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const parametroAtualizado = await Parametro.findByPk(id);
            return res.status(200).json(parametroAtualizado);
        }
        throw new Error('Parâmetro não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar parâmetro', error: error.message });
    }
};

// Controller para excluir um parâmetro
const excluirParametro = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Parametro.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ message: 'Parâmetro excluído com sucesso.' });
        }
        throw new Error('Parâmetro não encontrado ou não excluído.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir parâmetro', error: error.message });
    }
};

module.exports = {
    obterParametroPorId,
    obterTodosParametros,
    obterParametroDaAssociacao,
    criarParametro,
    atualizarParametro,
    excluirParametro
};