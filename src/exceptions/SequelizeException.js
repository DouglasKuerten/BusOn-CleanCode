import { StatusCodes } from 'http-status-codes';

class SequelizeException extends Error {
  constructor(originalError) {
    let message = 'Erro inesperado no banco de dados.';
    let statusCode = StatusCodes.BAD_REQUEST;
    if (originalError.name === 'SequelizeValidationError') {
      message = originalError.errors[0]?.message || message;
    } else if (originalError.name === 'SequelizeForeignKeyConstraintError') {
      statusCode = StatusCodes.CONFLICT;
      if (originalError.parent && originalError.parent.table) {
        message = `Não pode excluir porque há registros dependentes na tabela ${originalError.parent.table}.`;
      } else {
        message = 'Erro de chave estrangeira ao tentar excluir o registro.';
      }
    } else if (originalError.message) {
      message = originalError.message;
    }

    super(message);
    this.name = 'SequelizeException';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

export default SequelizeException;
