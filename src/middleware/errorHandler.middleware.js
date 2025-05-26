const { ValidationError } = require('yup');
const BusonException = require('../exceptions/BusonException');
const SequelizeException = require('../exceptions/SequelizeException');
const { StatusCodes } = require('http-status-codes');

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

module.exports = errorHandler;
