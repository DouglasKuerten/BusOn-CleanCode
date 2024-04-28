'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');
const TipoAcessoEnum = require('../enum/TIpoAcessoEnum');
const Curso = require('./curso');
const Associacao = require('./associacao');
const DiasSemanaEnum = require('../enum/DiasSemanaEnum');

const Usuario = sequelize.define('usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Curso,
            key: 'id'
        }
    },
    associacaoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Associacao,
            key: 'id'
        }
    },
    tipoAcesso: {
        type: DataTypes.ENUM(Object.keys(TipoAcessoEnum)),
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
        allowNull: false,
    },
    diasUsoTransporte: {
        type: DataTypes.ARRAY(DataTypes.ENUM(Object.keys(DiasSemanaEnum))),
        allowNull: false
    },

})

Usuario.belongsTo(Associacao, { foreignKey: 'associacaoId' });
Usuario.belongsTo(Curso, { foreignKey: 'cursoId' });


module.exports = Usuario;