'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const Instituicao = require('./instituicao');

const Curso = sequelize.define('curso', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
        allowNull: false,
    },
    instituicaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        references: {
            model: Instituicao,
            key: 'id'
        }
    },
})


module.exports = Curso;