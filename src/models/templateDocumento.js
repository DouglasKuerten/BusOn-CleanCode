'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const Associacao = require('./associacao');
const TipoImpressaoEnum = require('../enum/TipoImpressaoEnum');

const TemplateDocumento = sequelize.define('templateDocumento', {
    associacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        references: {
            model: Associacao,
            key: 'id'
        }
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
        defaultValue: TipoImpressaoEnum.UM_DOCUMENTO_PARA_UM_USUARIO
    },
    htmlTemplate: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = TemplateDocumento;