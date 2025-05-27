'use strict';

import { StatusCodes } from 'http-status-codes';
import UsuarioService from '../services/UsuarioService.js';

const obterUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await UsuarioService.obterUsuarioPorId(id);
    res.status(StatusCodes.OK).json(usuario);
  } catch (error) {
    next(error);
  }
};

const obterTodosUsuarios = async (req, res, next) => {
  try {
    const usuarios = await UsuarioService.obterTodosUsuarios(req.query.filters, req.query.orderBy);
    res.status(StatusCodes.OK).json(usuarios);
  } catch (error) {
    next(error);
  }
};

const criarUsuario = async (req, res, next) => {
  try {
    const dados = req.body.data ? JSON.parse(req.body.data) : req.body;
    const novoUsuario = await UsuarioService.criarUsuario(dados, req.file);
    res.status(StatusCodes.CREATED).json(novoUsuario);
  } catch (error) {
    next(error);
  }
};

const atualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dados = req.body.data ? JSON.parse(req.body.data) : req.body;
    const resultado = await UsuarioService.atualizarUsuario(id, dados, req.file);
    res.status(StatusCodes.OK).json(resultado);
  } catch (error) {
    next(error);
  }
};

const atualizarSenhaUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await UsuarioService.atualizarSenha(id, req.body);
    res.status(StatusCodes.OK).json(resultado);
  } catch (error) {
    next(error);
  }
};

const resetarSenhaUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await UsuarioService.resetarSenha(id);
    res.status(StatusCodes.OK).json(resultado);
  } catch (error) {
    next(error);
  }
};

const excluirUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resultado = await UsuarioService.excluirUsuario(id);
    res.status(StatusCodes.OK).json(resultado);
  } catch (error) {
    next(error);
  }
};

const obterUsuariosCompleto = async (req, res, next) => {
  try {
    const usuarios = await UsuarioService.obterUsuariosCompleto(req.query.filters, req.query.orderBy);
    res.status(StatusCodes.OK).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export default {
  obterUsuarioPorId,
  obterTodosUsuarios,
  criarUsuario,
  atualizarUsuario,
  atualizarSenhaUsuario,
  resetarSenhaUsuario,
  excluirUsuario,
  obterUsuariosCompleto
};
