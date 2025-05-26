const { StatusCodes } = require('http-status-codes');
const ParametroService = require('../services/ParametroService');

const obterParametroPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parametro = await ParametroService.obterParametroPorId(id);
    res.status(StatusCodes.OK).json(parametro);
  } catch (error) {
    next(error);
  }
};

const obterParametroDaAssociacaoPorId = async (req, res, next) => {
  try {
    const { associacaoId } = req.params;
    const parametro = await ParametroService.obterParametroDaAssociacaoPorId(associacaoId);
    res.status(StatusCodes.OK).json(parametro);
  } catch (error) {
    next(error);
  }
};

const obterTodosParametros = async (req, res, next) => {
  try {
    const parametros = await ParametroService.listarTodosParametros();
    res.status(StatusCodes.OK).json(parametros);
  } catch (error) {
    next(error);
  }
};

const criarParametro = async (req, res, next) => {
  try {
    const novoParametro = await ParametroService.criarParametro(req.body);
    res.status(StatusCodes.CREATED).json(novoParametro);
  } catch (error) {
    next(error);
  }
};

const atualizarParametro = async (req, res, next) => {
  try {
    const { id } = req.params;
    const parametroAtualizado = await ParametroService.atualizarParametro(id, req.body);
    res.status(StatusCodes.OK).json(parametroAtualizado);
  } catch (error) {
    next(error);
  }
};

const excluirParametro = async (req, res, next) => {
  try {
    const { id } = req.params;
    await ParametroService.excluirParametro(id);
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obterParametroPorId,
  obterTodosParametros,
  obterParametroDaAssociacaoPorId,
  criarParametro,
  atualizarParametro,
  excluirParametro,
};
