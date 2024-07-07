'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const associacao = require('./associacao');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const Associacao = require('./associacao');

const Instituicao = sequelize.define('instituicao', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
        allowNull: false,
    },
    associacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        references: {
            model: associacao,
            key: 'id'
        }
    },
    logoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
})
Instituicao.belongsTo(Associacao, { foreignKey: 'associacaoId', onDelete: 'RESTRICT', });

module.exports = Instituicao;