export const buildOrderByClause = (orderBy) => {
    let orderClause = [];
    if (orderBy) {
        const orders = JSON.parse(orderBy);
        // Itera sobre cada critério de ordenação fornecido
        orders.forEach(order => {
            // Verifica se a ordem e o campo de ordenação foram fornecidos
            if (order.field && order.direction) {
                // Adiciona o campo de ordenação e a direção à cláusula de ordenação
                orderClause.push([order.field, order.direction]);
            }
        });
    }
    return orderClause || [['id', 'ASC']];
}