'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const PixApi = require('./pixApi');

const Associacao = sequelize.define('associacao', {
    cnpj: {
        type: DataTypes.BIGINT,
    },
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
    pixApiId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PixApi,
            key: 'id'
        }
    }
})

module.exports = Associacao;