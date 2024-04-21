'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const SituacaoPagamentoEnum = require('../enum/SituacaoPagamentoEnum');
const TipoPagamentoEnum = require('../enum//TipoPagamentoEnum');


const usuario = require('./usuario');

const Pagamento = sequelize.define('pagamento', {
    txId: {
        type: DataTypes.STRING,
    },
    pixCopiaCola: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuarioId: {
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
    dataVencimento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dataPagamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoPagamentoEnum)),
        allowNull: false,
    },

});

module.exports = Pagamento;