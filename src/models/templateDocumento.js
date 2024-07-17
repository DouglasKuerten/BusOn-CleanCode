'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const Associacao = require('./associacao');

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
    htmlTemplate: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = TemplateDocumento;