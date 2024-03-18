'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const PixApi = sequelize.define('pixApi', {
    dev_api_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    client_secret: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

module.exports = PixApi;