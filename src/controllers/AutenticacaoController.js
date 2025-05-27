'use strict';

import AutenticacaoService from '../services/AutenticacaoService.js';
import { StatusCodes } from 'http-status-codes';

const authenticateUsuario = async (req, res, next) => {
  try {
    const userData = await AutenticacaoService.login(req.body);
    res.status(StatusCodes.OK).json(userData);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const tokenData = await AutenticacaoService.refreshToken(req.body);
    res.status(StatusCodes.OK).json(tokenData);
  } catch (error) {
    next(error);
  }
};

const validateToken = async (req, res, next) => {
  try {
    const userData = await AutenticacaoService.validateToken(
      req.user.dataValues,
    );
    res.status(StatusCodes.OK).json(userData);
  } catch (error) {
    next(error);
  }
};

export default {
  authenticateUsuario,
  refreshToken,
  validateToken,
};
