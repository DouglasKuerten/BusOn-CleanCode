const express = require('express');
const multer = require('multer');
const { storage } = require('./multerConfig');
const errorHandler = require('./src/middleware/errorHandler.middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.SERVER_PORT;

const routes = require('./src/routes/routes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const sequelize = require('./databaseConnection');

app.use(bodyParser.json());
app.use(cors());

const { Assistant, Thread, Associacao, TemplateDocumento, Parametro, Instituicao, Curso, Usuario, Pagamento } = require('./src/models/associationsModels');

const { gerarUsuarioAdmin } = require('./src/scripts/gerarUsuarioAdmin');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Todos os modelos foram sincronizados com sucesso');
  })
  .catch((error) => {
    console.log('Ocorreu um erro durante a sincronização dos modelos: ', error);
  });

gerarUsuarioAdmin().catch((err) => console.error(err));

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Servidor rodando na porta de conexão ${port}.`);
});

app.use('/api', routes);

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  return res.json(req.file.filename);
});
app.use('/files', express.static('uploads'));

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  // exit node.js app
  process.exit(0);
});
app.use(errorHandler);
const Job = require('./src/jobs/job');
