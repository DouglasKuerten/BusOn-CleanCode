'use strict';

import CursoService from '../services/CursoService.js';
import { StatusCodes } from 'http-status-codes';

const obterCursoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const curso = await CursoService.obterCursoPorId(id);
        res.status(StatusCodes.OK).json(curso);
    } catch (error) {
        next(error);
    }
};

const obterTodosCursos = async (req, res, next) => {
    try {
        const cursos = await CursoService.obterTodosCursos(req.query);
        res.status(StatusCodes.OK).json(cursos);
    } catch (error) {
        next(error);
    }
};

const criarCurso = async (req, res, next) => {
    try {
        const novoCurso = await CursoService.criarCurso(req.body);
        res.status(StatusCodes.CREATED).json(novoCurso);
    } catch (error) {
        next(error);
    }
};

const atualizarCurso = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cursoAtualizado = await CursoService.atualizarCurso(id, req.body);
        res.status(StatusCodes.OK).json(cursoAtualizado);
    } catch (error) {
        next(error);
    }
};

const excluirCurso = async (req, res, next) => {
    try {
        const { id } = req.params;
        await CursoService.excluirCurso(id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

export default {
    obterCursoPorId,
    obterTodosCursos,
    criarCurso,
    atualizarCurso,
    excluirCurso
};