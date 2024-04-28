'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const PixApi = sequelize.define('pixApi', {
    devApiKey: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    clientSecret: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

module.exports = PixApi;