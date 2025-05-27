import { ValidationError } from 'yup';
import BusonException from '../exceptions/BusonException.js';
import SequelizeException from '../exceptions/SequelizeException.js';
import { StatusCodes } from 'http-status-codes';
import { Sequelize, SequelizeScopeError } from 'sequelize';

function errorHandler(err, req, res, next) {
  console.error(err);
  if (err instanceof BusonException) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof SequelizeException || err instanceof Sequelize.UniqueConstraintError) {
    return res.status(err.statusCode || StatusCodes.BAD_REQUEST).json({
      message: err.message,
      exception: err.name,
      error: err.original?.detail
    });
  }
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
}

export default errorHandler;
