'use strict';

import { StatusCodes } from 'http-status-codes';
import * as AssociacaoService from '../services/AssociacaoService.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';

const obterAssociacaoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const associacao = await AssociacaoService.obterAssociacaoPorId(id);
    res.status(StatusCodes.OK).json(associacao);
  } catch (error) {
    next(error);
  }
};

const obterTodasAssociacoes = async (req, res, next) => {
  try {
    const whereClause = buildWhereClause(req.query.filters);
    const orderClause = buildOrderByClause(req.query.orderBy);

    const associacoes = await AssociacaoService.obterTodasAssociacoes(whereClause, orderClause);
    res.status(StatusCodes.OK).json(associacoes);
  } catch (error) {
    next(error);
  }
};

const criarAssociacao = async (req, res, next) => {
  try {
    const associacaoData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const novaAssociacao = await AssociacaoService.criarAssociacao(associacaoData, req.files);
    res.status(StatusCodes.CREATED).json(novaAssociacao);
  } catch (error) {
    next(error);
  }
};

const atualizarAssociacao = async (req, res, next) => {
  try {
    const associacaoData = req.body.data ? JSON.parse(req.body.data) : req.body;
    const resultado = await AssociacaoService.atualizarAssociacao(req.params.id, associacaoData, req.files);
    res.status(StatusCodes.OK).json(resultado);
  } catch (error) {
    next(error);
  }
};

const excluirAssociacao = async (req, res, next) => {
  try {
    const resultado = await AssociacaoService.excluirAssociacao(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default {
  obterAssociacaoPorId,
  obterTodasAssociacoes,
  criarAssociacao,
  atualizarAssociacao,
  excluirAssociacao,
};
