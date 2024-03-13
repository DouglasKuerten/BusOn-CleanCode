'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const SituacaoEnum = require('../../enum/enumOnibus/SituacaoEnum');
const TipoAcessoEnum = require('../../enum/enumOnibus/TIpoAcessoEnum');

const Usuario = sequelize.require('usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    curso: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    associacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_acesso: {
        type: DataTypes.ENUM(Object.keys(TipoAcessoEnum)),
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoEnum)),
        allowNull: false,
    }
})

module.exports = Usuario;