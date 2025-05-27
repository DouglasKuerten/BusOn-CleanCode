'use strict';

import InstituicaoService from '../services/InstituicaoService.js';
import { StatusCodes } from 'http-status-codes';

const obterInstituicaoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const instituicao = await InstituicaoService.obterInstituicaoPorId(id);
        res.status(StatusCodes.OK).json(instituicao);
    } catch (error) {
        next(error);
    }
};

const obterTodasInstituicoes = async (req, res, next) => {
    try {
        const instituicoes = await InstituicaoService.obterTodasInstituicoes(req.query);
        res.status(StatusCodes.OK).json(instituicoes);
    } catch (error) {
        next(error);
    }
};

const criarInstituicao = async (req, res, next) => {
    try {
        const novaInstituicao = await InstituicaoService.criarInstituicao(req.body, req.file);
        res.status(StatusCodes.CREATED).json(novaInstituicao);
    } catch (error) {
        next(error);
    }
};

const atualizarInstituicao = async (req, res, next) => {
    try {
        const { id } = req.params;
        const instituicaoAtualizada = await InstituicaoService.atualizarInstituicao(id, req.body, req.file);
        res.status(StatusCodes.OK).json(instituicaoAtualizada);
    } catch (error) {
        next(error);
    }
};

const excluirInstituicao = async (req, res, next) => {
    try {
        const { id } = req.params;
        await InstituicaoService.excluirInstituicao(id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        next(error);
    }
};

export default {
    obterInstituicaoPorId,
    obterTodasInstituicoes,
    criarInstituicao,
    atualizarInstituicao,
    excluirInstituicao
};
