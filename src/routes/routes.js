const express = require('express');
const router = express.Router();

const associacaoController = require('../controllers/associacaoController');
const usuarioController = require('../controllers/usuarioController');
const cursoController = require('../controllers/cursoController');
const instituicaoController = require('../controllers/instituicaoController');
const pagamentoController = require('../controllers/pagamentoController');
const parametroController = require('../controllers/parametroController');
const pixApiController = require('../controllers/pixApiController');

// Rotas para cadastro de usuário
router.post('/usuarios/cadastrar', usuarioController.cadastrarUsuario);

// Rotas para obtenção de registros por ID

// Rotas para Associação
router.get('/associacoes/:id', associacaoController.obterAssociacaoPorId);
router.get('/associacoes', associacaoController.obterTodasAssociacoes);
router.post('/associacoes', associacaoController.criarAssociacao);
router.put('/associacoes/:id', associacaoController.atualizarAssociacao);
router.delete('/associacoes/:id', associacaoController.excluirAssociacao);

// Rotas para Curso
router.get('/cursos/:id', cursoController.obterCursoPorId);
router.get('/cursos', cursoController.obterTodosOsCursos);
router.post('/cursos', cursoController.criarCurso);
router.put('/cursos/:id', cursoController.atualizarCurso);
router.delete('/cursos/:id', cursoController.deletarCurso);

// Rotas para Instituição
router.get('/instituicoes/:id', instituicaoController.obterInstituicaoPorId);
router.get('/instituicoes', instituicaoController.obterTodasAsInstituicoes);
router.post('/instituicoes', instituicaoController.criarInstituicao);
router.put('/instituicoes/:id', instituicaoController.atualizarInstituicao);
router.delete('/instituicoes/:id', instituicaoController.deletarInstituicao);

// Rotas para Pagamento
router.get('/pagamentos/:id', pagamentoController.obterPagamentoPorId);
router.get('/pagamentos', pagamentoController.obterTodosOsPagamentos);
router.post('/pagamentos', pagamentoController.criarPagamento);
router.put('/pagamentos/:id', pagamentoController.atualizarPagamento);
router.delete('/pagamentos/:id', pagamentoController.deletarPagamento);

// Rotas para Parâmetro
router.get('/parametros/:id', parametroController.obterParametroPorId);
router.get('/parametros', parametroController.obterTodosOsParametros);
router.post('/parametros', parametroController.criarParametro);
router.put('/parametros/:id', parametroController.atualizarParametro);
router.delete('/parametros/:id', parametroController.deletarParametro);

// Rotas para PixApi
router.get('/pixapis/:id', pixApiController.obterPixApiPorId);
router.get('/pixapis', pixApiController.obterTodasAsPixApis);
router.post('/pixapis', pixApiController.criarPixApi);
router.put('/pixapis/:id', pixApiController.atualizarPixApi);
router.delete('/pixapis/:id', pixApiController.deletarPixApi);

// Rotas para Usuário de Ônibus
router.get('/usuarios/:id', usuarioOnibusController.obterUsuarioPorId);
router.get('/usuariosonibus', usuarioOnibusController.obterTodosOsUsuarios);
router.post('/usuariosonibus', usuarioOnibusController.criarUsuario);
router.put('/usuariosonibus/:id', usuarioOnibusController.atualizarUsuario);
router.delete('/usuariosonibus/:id', usuarioOnibusController.deletarUsuario);

module.exports = router;
