'use strict';
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require("uuid");
const sequelize = require('../../databaseConnection');

const tokenAutenticacao = sequelize.define('tokenAutenticacao', {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataValidade: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

tokenAutenticacao.criarToken = async function (usuario) {
    let dataValidade = new Date();
    dataValidade.setSeconds(dataValidade.getSeconds() + Number(process.env.JWT_REFRESH_EXPIRATION));
    let _token = uuidv4();
    let refreshToken = await tokenAutenticacao.create({
        token: _token,
        usuarioId: usuario.id,
        dataValidade: dataValidade.getTime()
    })
    return refreshToken.token;
}

tokenAutenticacao.verificarDataValidade = (token) => {
    return token.dataValidade.getTime() < new Date().getTime();
}

module.exports = tokenAutenticacao;