const BusonException = require("../exceptions/BusonException");
const SequelizeException = require("../exceptions/SequelizeException");

function errorHandler(err, req, res, next) {
    if (err instanceof BusonException) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof SequelizeException) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    console.error(err);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
}

module.exports = errorHandler;
