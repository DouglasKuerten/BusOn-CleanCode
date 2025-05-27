import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';

class CursoQueryBuilder {
  constructor() {
    this.queryOptions = {
      include: [],
      attributes: [],
      where: {},
      order: [],
    };
  }

  withInstituicao() {
    this.queryOptions.include.push({
      model: Instituicao,
      attributes: ['id', 'nome'],
    });
    return this;
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
    return await Curso.findAll(this.queryOptions);
  }
}

export default CursoQueryBuilder;
