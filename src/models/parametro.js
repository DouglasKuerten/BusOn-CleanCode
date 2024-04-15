'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const LiberadoBloqueadoEnum = require('../enum/LiberadoBloqueadoEnum');


const Associacao = require('./associacao');

const Parametro = sequelize.define('parametro', {
    associacao_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        references: {
            model: Associacao,
            key: 'id'
        }
    },
    valor_1: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_3: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_4: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_5: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_6: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    valor_multa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dia_vencimento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dia_abertura_pagamentos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dias_tolerancia_multa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    libera_alteracao_dados_pessoais: {
        type: DataTypes.ENUM(Object.keys(LiberadoBloqueadoEnum)),
        allowNull: false,
    },


})

module.exports = Parametro;