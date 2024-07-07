const express = require('express')
const multer = require('multer')
const { storage } = require('./multerConfig')
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
const Parametro = require('./src/models/parametro');
const Instituicao = require('./src/models/instituicao');
const Curso = require('./src/models/curso');
const Usuario = require('./src/models/usuario');
const Pagamento = require('./src/models/pagamento');
const { gerarUsuarioAdmin } = require('./src/scripts/gerarUsuarioAdmin')

sequelize.sync({ force: false }).then(() => {
    console.log('Todos os modelos foram sincronizados com sucesso');
}).catch(error => {
    console.log('Ocorreu um erro durante a sincronização dos modelos: ', error);
})

gerarUsuarioAdmin().catch(err => console.error(err));

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

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    return res.json(req.file.filename);
})
app.use('/files', express.static('uploads'))

process.on('SIGINT', function () {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    // exit node.js app
    process.exit(0);
});

const Job = require('./src/jobs/job');

