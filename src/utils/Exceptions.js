const getFormattedSequelizeExceptions = (error) => {
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((err) => ({
            message: err.message,
            field: err.path,
        }));
        console.error(validationErrors[0]);
        return validationErrors[0];
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
        if (error.parent && error.parent.table && error.parent.constraint) {
            const tableName = error.parent.table;
            const constraintName = error.parent.constraint;
            console.error(`Erro de chave estrangeira (${constraintName}) ao tentar excluir o registro na tabela ${tableName}: ${error.message}`);
            return {
                message: `O registro não pode ser excluído porque existem registros dependentes na tabela ${tableName}.`,
                constraintName: constraintName,
            };
        } else {
            console.error('Erro de chave estrangeira:', error.message);
            return { message: 'Erro de chave estrangeira ao tentar excluir o registro.' };
        }
    } else {
        // Erros não mapeados
        console.error(error);
        return error;
    }
}
//SequelizeForeignKeyConstraintError

module.exports = getFormattedSequelizeExceptions;