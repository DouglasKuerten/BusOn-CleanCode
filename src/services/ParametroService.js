'use strict';

const Parametro = require('../models/Parametro');
const BusonException = require('../exceptions/BusonException');
const { StatusCodes } = require('http-status-codes');
const SequelizeException = require('../exceptions/SequelizeException');
const parametroSchema = require('../validators/ParametroSchema');

class ParametroService {
  async obterParametroPorId(id) {
    const parametro = await Parametro.findByPk(id);
    if (!parametro) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Parâmetros da associação não foram encontrados!');
    }
    return parametro;
  }

  async obterParametroDaAssociacaoPorId(associacaoId) {
    const parametro = await Parametro.findOne({ where: { associacaoId } });
    if (!parametro) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Parâmetros da associação não foram encontrados!');
    }
    return parametro;
  }

  async listarTodosParametros() {
    return await Parametro.findAll();
  }

  async criarParametro(dados) {
    await parametroSchema.validate(dados);
    return await Parametro.create(dados);
  }

  async atualizarParametro(id, dados) {
    await parametroSchema.validate(dados);

    const [atualizado] = await Parametro.update(dados, {
      where: { id },
    });

    if (!atualizado) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Parâmetro não encontrado');
    }

    return await this.obterParametroPorId(id);
  }

  async excluirParametro(id) {
    try {
      const excluido = await Parametro.destroy({
        where: { id },
      });

      if (!excluido) {
        throw new BusonException(StatusCodes.NOT_FOUND, 'Parâmetro não encontrado');
      }

      return true;
    } catch (error) {
      if (error.name && error.name.startsWith('Sequelize')) {
        throw new SequelizeException(error);
      }
      throw error;
    }
  }
}

module.exports = new ParametroService();
