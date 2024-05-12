'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const Imagem = sequelize.define('imagem', {
    imagem: {
        type: DataTypes.BLOB,
        allowNull: true
    }
})

module.exports = Imagem;