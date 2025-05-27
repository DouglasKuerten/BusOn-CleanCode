'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';
import SituacaoPagamentoEnum from '../enum/SituacaoPagamentoEnum.js';
import TipoPagamentoEnum from '../enum/TipoPagamentoEnum.js';

import Usuario from './usuario.js';

const Pagamento = sequelize.define('pagamento', {
    txId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pixCopiaCola: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    tipo: {
        type: DataTypes.ENUM(Object.keys(TipoPagamentoEnum)),
        allowNull: false,
    },
    valor: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    multa: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    dataVencimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dataPagamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoPagamentoEnum)),
        allowNull: false,
    },

});

export default Pagamento;