'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');


const instituicao = require('./instituicao');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');

const Curso = sequelize.define('curso', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
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