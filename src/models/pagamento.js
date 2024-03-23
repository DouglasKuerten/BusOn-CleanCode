'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const SituacaoPagamentoEnum = require('../enum/SituacaoPagamentoEnum');
const TipoPagamentoEnum = require('../enum//TipoPagamentoEnum');


const usuario = require('./usuario');

const Pagamento = sequelize.define('pagamento', {
    txid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    copia_cola: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    tipo: {
        type: DataTypes.ENUM(Object.keys(TipoPagamentoEnum)),
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    multa: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    data_vencimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoPagamentoEnum)),
        allowNull: false,
    },

});

module.exports = Pagamento;