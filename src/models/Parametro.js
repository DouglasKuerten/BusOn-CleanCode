'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';
import LiberadoBloqueadoEnum from '../enum/LiberadoBloqueadoEnum.js';

import Associacao from './Associacao.js';
import SimNaoEnum from '../enum/SimNaoEnum.js';

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

export default Parametro;
