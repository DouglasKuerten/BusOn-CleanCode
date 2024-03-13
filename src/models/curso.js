'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const Curso = sequelize.define('curso', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instituicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

module.exports = Curso;