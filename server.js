import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import multer from 'multer';
import { storage } from './multerConfig.js';
import errorHandler from './src/middleware/errorHandler.middleware.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './src/routes/Routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import sequelize from './databaseConnection.js';
import * as Job from './src/jobs/job.js';
const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

import { Associacao, TemplateDocumento, Parametro, Instituicao, Curso, Usuario, Pagamento } from './src/models/AssociationsModels.js';

import { gerarUsuarioAdmin } from './src/scripts/gerarUsuarioAdmin.js';

sequelize.sync({ force: false })
  .then(() => {
    console.log('Todos os modelos foram sincronizados com sucesso');
    gerarUsuarioAdmin().catch((err) => console.error(err));
  })
  .catch((error) => {
    console.log('Ocorreu um erro durante a sincronização dos modelos: ', error);
  });




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