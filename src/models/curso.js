'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');


const instituicao = require('./instituicao');

const Curso = sequelize.define('curso', {
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instituicao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: instituicao,
            key: 'id'
        }
    },
})


module.exports = Curso;