'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const LiberadoBloqueadoEnum = require('../enum/LiberadoBloqueadoEnum');


const Associacao = require('./associacao');

const Parametro = sequelize.define('parametro', {
    associacaoId: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: Associacao,
            key: 'id'
        }
    },
    valor1: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor3: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor4: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor5: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor6: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valorMulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diaVencimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diaAberturaPagamentos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    diasToleranciaMulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    liberaAlteracaoDadosPessoais: {
        type: DataTypes.ENUM(Object.keys(LiberadoBloqueadoEnum)),
        allowNull: false,
    },


})

module.exports = Parametro;