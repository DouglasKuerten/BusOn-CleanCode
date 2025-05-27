import { ValidationError } from 'yup';
import BusonException from '../exceptions/BusonException.js';
import SequelizeException from '../exceptions/SequelizeException.js';
import { StatusCodes } from 'http-status-codes';

function errorHandler(err, req, res, next) {
  if (err instanceof BusonException) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof SequelizeException) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
}

export default errorHandler;
