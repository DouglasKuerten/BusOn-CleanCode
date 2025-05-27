import PagamentoService from '../services/PagamentoService.js';
import { StatusCodes } from 'http-status-codes';

const obterPagamentoPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pagamento = await PagamentoService.obterPagamentoPorId(id);
    res.status(StatusCodes.OK).json(pagamento);
  } catch (error) {
    next(error);
  }
};

const obterTodosPagamentos = async (req, res, next) => {
  try {
    const pagamentos = await PagamentoService.obterTodosPagamentos(req.query);
    res.status(StatusCodes.OK).json(pagamentos);
  } catch (error) {
    next(error);
  }
};

const criarPagamento = async (req, res, next) => {
  try {
    const pagamento = await PagamentoService.criarPagamento(req.body);
    res.status(StatusCodes.CREATED).json(pagamento);
  } catch (error) {
    next(error);
  }
};

const atualizarPagamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await PagamentoService.atualizarPagamento(id, req.body);
    res.status(StatusCodes.OK).json(resultado);
  } catch (error) {
    next(error);
  }
};

const excluirPagamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PagamentoService.excluirPagamento(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const aprovarPagamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PagamentoService.aprovarPagamento(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const reprovarPagamento = async (req, res, next) => {
  try {
    const { id } = req.params;
    await PagamentoService.reprovarPagamento(id);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

const gerarPagamentosMensaisManualmente = async (req, res, next) => {
  try {
    const { associacaoId } = req.params;
    await PagamentoService.gerarPagamentosMensaisManualmente(associacaoId);
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};

export default {
  obterPagamentoPorId,
  obterTodosPagamentos,
  criarPagamento,
  atualizarPagamento,
  excluirPagamento,
  aprovarPagamento,
  reprovarPagamento,
  gerarPagamentosMensaisManualmente,
};
