'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');

const Assistant = sequelize.define('assistant', {
    api_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
        allowNull: false,
    },
})

module.exports = Assistant;