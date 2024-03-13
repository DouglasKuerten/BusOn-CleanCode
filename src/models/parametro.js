'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const LiberadoBloqueadoEnum = require('../../enum/enumOnibus/LiberadoBloqueadoEnum');

const Parametro = sequelize.require('parametro', {
    associacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        type: DataTypes.DATE,
        allowNull: false,
    },
    dia_aberto: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dia_tolerancia_multa: {
        type: DataTypes.ENUM(Object.keys(LiberadoBloqueadoEnum)),
        allowNull: false,
    },
    libera_pagamento: {
        type: DataTypes.ENUM(Object.keys(LiberadoBloqueadoEnum)),
        allowNull: false,
    },


})

module.exports = Parametro;