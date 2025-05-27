import express from 'express';
import multer from 'multer';
import { storage } from '../../multerConfig.js';

const router = express.Router();

import associacaoController from '../controllers/AssociacaoController.js';
import instituicaoController from '../controllers/InstituicaoController.js';
import cursoController from '../controllers/CursoController.js';
import autenticacaoController from '../controllers/AutenticacaoController.js';
import usuarioController from '../controllers/UsuarioController.js';
import pagamentoController from '../controllers/PagamentoController.js';
import parametroController from '../controllers/ParametroController.js';
import chatbotController from '../controllers/ChatbotController.js';
import templateDocumentosController from '../controllers/TemplateDocumentosController.js';
import { validarAutenticacao, logout } from '../middleware/autenticacao.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
const upload = multer({ storage: storage });

router.use(['/usuario', '/associacao', '/instituicao', '/curso', '/pagamento', '/parametro', '/template-documento'], validarAutenticacao);

// Rotas para cadastro de usuário
router.get('/usuario/completo', usuarioController.obterUsuariosCompleto);
router.get('/usuario/:id', usuarioController.obterUsuarioPorId);
router.get('/usuario', usuarioController.obterTodosUsuarios);
router.post('/usuario', upload.single('foto'), usuarioController.criarUsuario);
router.put('/usuario/:id', upload.single('foto'), usuarioController.atualizarUsuario);
router.put('/usuario/atualizar-senha/:id', usuarioController.atualizarSenhaUsuario);
router.put('/usuario/resetar-senha/:id', usuarioController.resetarSenhaUsuario);
router.delete('/usuario/:id', usuarioController.excluirUsuario);

// Rota para autenticar o usuário e gerar um token JWT
router.post('/autenticacao/autenticar', autenticacaoController.authenticateUsuario);
router.post('/autenticacao/atualizar-token', autenticacaoController.refreshToken);
router.post('/autenticacao/validar-token', validarAutenticacao, autenticacaoController.validateToken);
router.post('/autenticacao/logout', validarAutenticacao, logout);

// Rotas para Associação
router.get('/associacao/:id', associacaoController.obterAssociacaoPorId);
router.get('/associacao', associacaoController.obterTodasAssociacoes);
router.post(
  '/associacao',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'logoDeclaracao', maxCount: 1 },
  ]),
  associacaoController.criarAssociacao
);
router.put(
  '/associacao/:id',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'logoDeclaracao', maxCount: 1 },
  ]),
  associacaoController.atualizarAssociacao
);
router.delete('/associacao/:id', associacaoController.excluirAssociacao);

router.get('/template-documento/:id', templateDocumentosController.obterTemplateDocumentoPorId);
router.get('/template-documento', templateDocumentosController.obterTodosTemplatesDocumentos);
router.post('/template-documento', templateDocumentosController.criarTemplateDocumento);
router.put('/template-documento/:id', templateDocumentosController.atualizarTemplateDocumento);
router.delete('/template-documento/:id', templateDocumentosController.excluirTemplateDocumento);

// Rotas para Instituição
router.get('/instituicao/:id', instituicaoController.obterInstituicaoPorId);
router.get('/instituicao', instituicaoController.obterTodasInstituicoes);
router.post('/instituicao', upload.single('logo'), instituicaoController.criarInstituicao);
router.put('/instituicao/:id', upload.single('logo'), instituicaoController.atualizarInstituicao);
router.delete('/instituicao/:id', instituicaoController.excluirInstituicao);

// Rotas para Curso
router.get('/curso/:id', cursoController.obterCursoPorId);
router.get('/curso', cursoController.obterTodosCursos);
router.post('/curso', cursoController.criarCurso);
router.put('/curso/:id', cursoController.atualizarCurso);
router.delete('/curso/:id', cursoController.excluirCurso);

// Rotas para Pagamento
router.get('/pagamento/:id', pagamentoController.obterPagamentoPorId);
router.get('/pagamento', pagamentoController.obterTodosPagamentos);
router.post('/pagamento', pagamentoController.criarPagamento);
router.put('/pagamento/:id', pagamentoController.atualizarPagamento);
router.put('/pagamento/aprovar/:id', pagamentoController.aprovarPagamento);
router.put('/pagamento/reprovar/:id', pagamentoController.reprovarPagamento);
router.delete('/pagamento/:id', pagamentoController.excluirPagamento);
router.post('/pagamento/gerar-manualmente/:associacaoId', pagamentoController.gerarPagamentosMensaisManualmente);

// Rotas para Parâmetro
router.get('/parametro/:id', parametroController.obterParametroPorId);
router.get('/parametro/associacao/:associacaoId', parametroController.obterParametroDaAssociacaoPorId);
router.get('/parametro', parametroController.obterTodosParametros);
router.post('/parametro', parametroController.criarParametro);
router.put('/parametro/:id', parametroController.atualizarParametro);
router.delete('/parametro/:id', parametroController.excluirParametro);

// Rotas para chatbot
router.get('/chatbot/completion', chatbotController.getChatbotResponse);
router.post('/chatbot/conversation', chatbotController.postConversation);

export default router;
