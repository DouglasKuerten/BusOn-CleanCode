export const buildOrderByClause = (orderBy) => {
  let orderClause = [];
  if (orderBy) {
    const orders = JSON.parse(orderBy);
    orders.forEach((order) => {
      if (order.field && order.direction) {
        orderClause.push([order.field, order.direction]);
      }
    });
  }
  return orderClause || [['id', 'ASC']];
};
