'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';

import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import Instituicao from './Instituicao.js';

const Curso = sequelize.define('curso', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
    allowNull: false,
  },
  instituicaoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'RESTRICT',
    references: {
      model: Instituicao,
      key: 'id',
    },
  },
});

export default Curso;
