const { Op } = require('sequelize');

exports.buildWhereClause = (filtros) => {
    let whereClause = {};

    if (filtros != undefined && filtros != null && filtros != 'undefined') {
        const parsedFilters = JSON.parse(filtros);
        console.log(parsedFilters)
        // Função auxiliar para construir a cláusula where com base nos filtros fornecidos
        const buildWhere = (filters, operator) => {
            const where = {};
            Object.keys(filters).forEach((key) => {
                if (filters[key]) {
                    const value = operator === Op.iLike ? `%${filters[key]}%` : filters[key];

                    where[key] = {
                        [operator]: value
                    }
                }
            });
            return where;
        };
        // Constrói a cláusula where para cada tipo de filtro
        if (parsedFilters.equals) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.equals, Op.eq) };
        }
        if (parsedFilters.between) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.between, Op.between) };
        }
        if (parsedFilters.greaterEquals) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.greaterEquals, Op.gte) };
        }
        if (parsedFilters.lessEquals) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.lessEquals, Op.lte) };
        }
        if (parsedFilters.notEquals) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.notEquals, Op.ne) };
        }
        if (parsedFilters.in) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.in, Op.in) };
        }
        if (parsedFilters.notIn) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.notIn, Op.notIn) };
        }
        if (parsedFilters.iLike) {
            whereClause = { ...whereClause, ...buildWhere(parsedFilters.iLike, Op.iLike) };
        }
    }
    console.log('whereClause', whereClause)
    return whereClause;
};
