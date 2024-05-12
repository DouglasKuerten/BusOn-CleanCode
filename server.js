const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const port = process.env.SERVER_PORT

const routes = require('./src/routes/routes')

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./config/swagger-output.json');
const sequelize = require('./databaseConnection')

app.use(bodyParser.json());
app.use(cors())

const Assistant = require('./src/models/assistant');
const Thread = require('./src/models/thread');
const Associacao = require('./src/models/associacao');
const Instituicao = require('./src/models/instituicao');
const Curso = require('./src/models/curso');
const Usuario = require('./src/models/usuario');
const Pagamento = require('./src/models/pagamento');
const Parametro = require('./src/models/parametro');
const PixApi = require('./src/models/pixApi');

sequelize.sync({ force: false }).then(() => {
    console.log('Todos os modelos foram sincronizados com sucesso');
}).catch(error => {
    console.log('OCorreu um erro durante a sincronização dos modelos: ', error);
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.listen(port, () => {
    console.log(`Servidor rodando na porta de conexão ${port}.`)
})

app.use('/api', routes);

process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    // exit node.js app
    process.exit(0);
});
