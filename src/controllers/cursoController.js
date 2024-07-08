'use strict';

const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const getFormattedSequelizeExceptions = require('../utils/Exceptions');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');

// Controller para obter um curso pelo ID
const obterCursoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if (curso) {
            return res.status(200).json(curso);
        }
        throw new Error('Curso não encontrado.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter curso', error: error.message });
    }
};

// Controller para obter todos os cursos
const obterTodosCursos = async (req, res) => {
    try {
        const whereClause = buildWhereClause(req.query.filters);
        const orderClause = buildOrderByClause(req.query.orderBy)

        const cursos = await Curso.findAll({
            include: [{
                model: Instituicao,
                attributes: ['id', 'nome']
            }],
            attributes: ['id', 'nome', 'situacao'],
            where: whereClause,
            order: orderClause
        });
        res.status(200).json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter todos os cursos', error: error.message });
    }
};

// Controller para criar um novo curso
const criarCurso = async (req, res) => {
    try {
        const novoCurso = await Curso.create(req.body);
        res.status(201).json(novoCurso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar novo curso', error: error.message });
    }
};

// Controller para atualizar um curso existente
const atualizarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Curso.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const cursoAtualizado = await Curso.findByPk(id);
            return res.status(200).json(cursoAtualizado);
        }
        throw new Error('Curso não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar curso', error: error.message });
    }
};

// Controller para excluir um curso
const excluirCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Curso.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ message: 'Curso excluído com sucesso.' });
        }
        throw new Error('Curso não encontrado ou não excluído.');
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error)
        console.error(erro);
        res.status(500).json({ title: 'Erro ao excluir curso', message: erro.message });
    }
};

module.exports = {
    obterCursoPorId,
    obterTodosCursos,
    criarCurso,
    atualizarCurso,
    excluirCurso
};