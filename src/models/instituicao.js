'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const Instituicao = sequelize.define('instituicao', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Instituicao;