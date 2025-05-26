'use strict';

const { StatusCodes } = require('http-status-codes');
const AssociacaoService = require('../services/AssociacaoService');
const { buildOrderByClause } = require('../utils/buildOrderByClause');
const { buildWhereClause } = require('../utils/buildWhereClause');

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

module.exports = {
  obterAssociacaoPorId,
  obterTodasAssociacoes,
  criarAssociacao,
  atualizarAssociacao,
  excluirAssociacao,
};
