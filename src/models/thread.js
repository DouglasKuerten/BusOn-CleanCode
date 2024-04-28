'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const Thread = sequelize.define('thread', {
    api_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Thread;