'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');

const Associacao = sequelize.define('associacao', {
    cnpj: {
        type: DataTypes.BIGINT,
        allowNull: true
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
    logoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Associacao;