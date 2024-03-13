'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const LiberadoBloqueadoEnum = require('../../enum/enumOnibus/LiberadoBloqueadoEnum');
const SituacaoEnum = require('../../enum/enumOnibus/SituacaoEnum');

const Associacao = sequelize.require('associacao', {
    cpf_cnpj: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pix_api_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoEnum)),
        allowNull: false,
    },


})

module.exports = Associacao;