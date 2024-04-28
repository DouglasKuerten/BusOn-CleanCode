const getFormattedSequelizeExceptions = (error) => {
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((err) => ({
            message: err.message,
            field: err.path,
        }));
        console.error(validationErrors[0]);
        return validationErrors[0];
    } else {
        // Erros não mapeados
        console.error(error);
        return error;
    }
}

module.exports = getFormattedSequelizeExceptions;