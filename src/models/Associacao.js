'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';

const Associacao = sequelize.define('associacao', {
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bairro: {
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
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logoDeclaracaoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Associacao;
