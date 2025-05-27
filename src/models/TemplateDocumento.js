'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import Associacao from './Associacao.js';
import TipoImpressaoEnum from '../enum/TipoImpressaoEnum.js';

const TemplateDocumento = sequelize.define('templateDocumento', {
  associacaoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'RESTRICT',
    references: {
      model: Associacao,
      key: 'id',
    },
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
    allowNull: false,
  },
  tipoImpressao: {
    type: DataTypes.ENUM(Object.keys(TipoImpressaoEnum)),
    allowNull: false,
    defaultValue: TipoImpressaoEnum.UM_DOCUMENTO_PARA_UM_USUARIO,
  },
  htmlTemplate: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default TemplateDocumento;
