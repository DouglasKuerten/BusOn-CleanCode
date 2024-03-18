'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const SituacaoEnum = require('../enum/SituacaoEnum');

const Associacao = sequelize.define('associacao', {
    cpf_cnpj: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pix_api_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoEnum)),
        allowNull: false,
    },


})

module.exports = Associacao;