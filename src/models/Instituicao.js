'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import Associacao from './Associacao.js';

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

export default Instituicao;
