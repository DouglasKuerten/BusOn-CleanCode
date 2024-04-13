const { Sequelize } = require('sequelize');

const config = {
    "username": process.env.PG_USER,
    "password": process.env.PG_PASSWORD,
    "database": process.env.PG_DATABASE,
    "host": process.env.PG_HOST,
    "dialect": process.env.PG_DIALECT
}

const sequelize = new Sequelize(config);

sequelize.authenticate().then(() => {
    console.log('Conexão com o banco de dados realizado com sucesso!');
}).catch(err => {
    console.error('Falha ao conectar com o banco de dados: ', err);
})

module.exports = sequelize;