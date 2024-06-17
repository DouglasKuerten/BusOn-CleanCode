'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const Imagem = require('./imagem');

const Associacao = sequelize.define('associacao', {
    cnpj: {
        type: DataTypes.BIGINT,
    },
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
    logoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Imagem,
            key: 'id'
        }
    }
})
Associacao.belongsTo(Imagem, { foreignKey: 'logoId' });


module.exports = Associacao;