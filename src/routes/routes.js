const express = require('express');
const router = express.Router();

const associacaoController = require('../controllers/associacaoController');
const instituicaoController = require('../controllers/instituicaoController');
const cursoController = require('../controllers/cursoController');
const autenticacaoController = require('../controllers/autenticacaoController');
const usuarioController = require('../controllers/usuarioController');
const pagamentoController = require('../controllers/pagamentoController');
const parametroController = require('../controllers/parametroController');
const pixApiController = require('../controllers/pixApiController');
const chatbotController = require('../controllers/chatbotController');

// Rotas para cadastro de usuário
router.get('/usuarios/:id', usuarioController.obterUsuarioPorId);
router.get('/usuarios', usuarioController.obterTodosUsuarios);
router.post('/usuarios', usuarioController.criarUsuario);
router.put('/usuarios/:id', usuarioController.atualizarUsuario);
router.delete('/usuarios/:id', usuarioController.excluirUsuario);

// Rota para autenticar o usuário e gerar um token JWT
router.post('/usuarios/autenticar', autenticacaoController.authenticateUsuario);
router.post('/usuarioss/atualizar-token', autenticacaoController.refreshToken);

// Rotas para obtenção de registros por ID

// Rotas para Associação
router.get('/associacao/:id', associacaoController.obterAssociacaoPorId);
router.get('/associacao', associacaoController.obterTodasAssociacoes);
router.post('/associacao', associacaoController.criarAssociacao);
router.put('/associacao/:id', associacaoController.atualizarAssociacao);
router.delete('/associacao/:id', associacaoController.excluirAssociacao);

// Rotas para Instituição
router.get('/instituicao/:id', instituicaoController.obterInstituicaoPorId);
router.get('/instituicao', instituicaoController.obterTodasInstituicoes);
router.post('/instituicao', instituicaoController.criarInstituicao);
router.put('/instituicao/:id', instituicaoController.atualizarInstituicao);
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
router.delete('/pagamento/:id', pagamentoController.excluirPagamento);

// Rotas para Parâmetro
router.get('/parametro/:id', parametroController.obterParametroPorId);
router.get('/parametro', parametroController.obterTodosParametros);
router.post('/parametro', parametroController.criarParametro);
router.put('/parametro/:id', parametroController.atualizarParametro);
router.delete('/parametro/:id', parametroController.excluirParametro);

// Rotas para PixApi
router.get('/pixapi/:id', pixApiController.obterPixApiPorId);
router.get('/pixapi', pixApiController.obterTodasPixApis);
router.post('/pixapi', pixApiController.criarPixApi);
router.put('/pixapi/:id', pixApiController.atualizarPixApi);
router.delete('/pixapi/:id', pixApiController.excluirPixApi);

// Rotas para chatbot
router.get('/chatbot/completion', chatbotController.getChatbotResponse);
router.post('/chatbot/conversation', chatbotController.postConversation);

module.exports = router;
