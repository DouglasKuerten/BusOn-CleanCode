const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.SERVER_PORT

const routes = require('./src/routes/routes')

const sequelize = require('./databaseConnection')

app.use(bodyParser.json());
app.use(cors())

const Usuario = require('./src/models/usuario');

sequelize.sync({ force: false }).then(() => {
    console.log('Todos os modelos foram sincronizados com sucesso');
}).catch(error => {
    console.log('OCorreu um erro durante a sincronização dos modelos: ', error);
})

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.listen(port, () => {
    console.log(`Servidor rodando na porta de conexão ${port}.`)
})

app.get('/', (request, response) => {
    response.json({ aplicacao: 'CRUD MONEYZ' })
})
app.use('/api', routes);