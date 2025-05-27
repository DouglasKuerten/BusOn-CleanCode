import Instituicao from '../models/Instituicao.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';

class InstituicaoQueryBuilder {
  constructor() {
    this.queryOptions = {
      where: {},
      order: [],
    };
  }

  withFiltros(filtros) {
    this.queryOptions.where = buildWhereClause(filtros);
    return this;
  }

  withOrdenacao(orderBy) {
    this.queryOptions.order = buildOrderByClause(orderBy);
    return this;
  }

  selectCampos(campos) {
    this.queryOptions.attributes = campos;
    return this;
  }

  async findAll() {
    return await Instituicao.findAll(this.queryOptions);
  }
}

export default InstituicaoQueryBuilder;
