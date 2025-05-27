import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  dialect: process.env.PG_DIALECT,
  define: {
    underscored: true,
  },
};
const sequelize = new Sequelize(config);

async function connect() {
  await sequelize
    .authenticate()
    .then(() => {
      console.log('Conexão com o banco de dados realizado com sucesso!');
    })
    .catch((err) => {
      console.error('Falha ao conectar com o banco de dados: ', err);
    });
}
await connect();
export default sequelize;
