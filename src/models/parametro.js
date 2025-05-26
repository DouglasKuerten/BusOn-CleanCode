'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const LiberadoBloqueadoEnum = require('../enum/LiberadoBloqueadoEnum');

const Associacao = require('./Associacao');
const SimNaoEnum = require('../enum/SimNaoEnum');

const Parametro = sequelize.define('parametro', {
  associacaoId: {
    type: DataTypes.INTEGER,
    unique: true,
    onDelete: 'CASCADE',
    allowNull: false,
    references: {
      model: Associacao,
      key: 'id',
    },
  },
  valor1: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor2: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor3: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor4: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor5: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valor6: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  valorMulta: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  diaVencimento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  diasToleranciaMulta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  liberaAlteracaoDadosPessoais: {
    type: DataTypes.ENUM(Object.keys(LiberadoBloqueadoEnum)),
    allowNull: false,
  },
  gerarPagamentosAutomatico: {
    type: DataTypes.ENUM(Object.keys(SimNaoEnum)),
    allowNull: false,
  },
});

module.exports = Parametro;
