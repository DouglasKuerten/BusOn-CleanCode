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
const app = express();

const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(cors());

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Job from './src/jobs/job.js';
import {
  Associacao,
  TemplateDocumento,
  Parametro,
  Instituicao,
  Curso,
  Usuario,
  Pagamento,
} from './src/models/AssociationsModels.js';
/* eslint-enable @typescript-eslint/no-unused-vars */

import { gerarUsuarioAdmin } from './src/scripts/gerarUsuarioAdmin.js';

sequelize
  .sync({ force: false, logging: false })
  .then(() => {
    console.debug('Todos os modelos foram sincronizados com sucesso');
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
  }),
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api', routes);

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  return res.json(req.file.filename);
});
app.use('/files', express.static('uploads'));

process.on('SIGINT', function () {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
});
app.listen(port, () => {
  console.info(`API disponível em http://localhost:${port}/api`);
  console.info(`Swagger disponível em http://localhost:${port}/api/docs`);
});
app.use(errorHandler);
