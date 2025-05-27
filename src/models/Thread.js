'use strict';
import { DataTypes } from 'sequelize';
import sequelize from '../../databaseConnection.js';

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

export default Thread;