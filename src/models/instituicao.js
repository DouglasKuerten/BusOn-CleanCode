'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const Associacao = require('./Associacao');

const Instituicao = sequelize.define('instituicao', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
    allowNull: false,
  },
  associacaoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'RESTRICT',
    references: {
      model: Associacao,
      key: 'id',
    },
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Instituicao;
