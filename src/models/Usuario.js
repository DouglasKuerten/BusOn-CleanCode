'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import TipoAcessoEnum from '../enum/TIpoAcessoEnum.js';
import Curso from './Curso.js';
import Associacao from './Associacao.js';
import DiasSemanaEnum from '../enum/DiasSemanaEnum.js';

const Usuario = sequelize.define('usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cpf: {
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
    onDelete: 'RESTRICT',
    references: {
      model: Curso,
      key: 'id',
    },
  },
  associacaoId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    onDelete: 'RESTRICT',
    references: {
      model: Associacao,
      key: 'id',
    },
  },
  dataEntradaAssociacao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tipoAcesso: {
    type: DataTypes.ENUM(Object.keys(TipoAcessoEnum)),
    allowNull: false,
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
    defaultValue: [],
  },
  exigirRedefinicaoSenha: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  fotoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Usuario;
