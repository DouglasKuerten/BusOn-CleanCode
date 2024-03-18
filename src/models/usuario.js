'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const SituacaoEnum = require('../enum/SituacaoEnum');
const TipoAcessoEnum = require('../enum/TIpoAcessoEnum');

const Usuario = sequelize.define('usuario', {
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
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'curso',
            key: 'id'
        }
    },
    associacao_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'associacao',
            key: 'id'
        }
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