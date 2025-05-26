const express = require('express');
const multer = require('multer')
const { storage } = require('../../multerConfig')

const router = express.Router();

const associacaoController = require('../controllers/associacaoController');
const instituicaoController = require('../controllers/instituicaoController');
const cursoController = require('../controllers/cursoController');
const autenticacaoController = require('../controllers/autenticacaoController');
const usuarioController = require('../controllers/usuarioController');
const pagamentoController = require('../controllers/pagamentoController');
const parametroController = require('../controllers/parametroController');
const chatbotController = require('../controllers/chatbotController');
const templateDocumentosController = require('../controllers/templateDocumentosController');
const { validarAutenticacao, logout } = require('../middleware/autenticacao.middleware');
const { validate } = require('../middleware/validate.middleware');
const { pagamentoBodySchema } = require('../validators/pagamentoSchema');
const upload = multer({ storage: storage })

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
router.post('/associacao', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'logoDeclaracao', maxCount: 1 }]), associacaoController.criarAssociacao);
router.put('/associacao/:id', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'logoDeclaracao', maxCount: 1 }]), associacaoController.atualizarAssociacao);
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
router.post('/pagamento', validate(pagamentoBodySchema, 'body'), pagamentoController.criarPagamento);
router.put('/pagamento/:id', pagamentoController.atualizarPagamento);
router.put('/pagamento/aprovar/:id', pagamentoController.aprovarPagamento);
router.put('/pagamento/reprovar/:id', pagamentoController.reprovarPagamento);
router.delete('/pagamento/:id', pagamentoController.excluirPagamento);
router.post('/pagamento/gerar-manualmente', pagamentoController.gerarPagamentosMensaisManualmente);

// Rotas para Parâmetro
router.get('/parametro/associacao/:associacaoId', parametroController.obterParametroDaAssociacao);
router.get('/parametro', parametroController.obterTodosParametros);
router.post('/parametro', parametroController.criarParametro);
router.put('/parametro/:id', parametroController.atualizarParametro);
router.delete('/parametro/:id', parametroController.excluirParametro);

// Rotas para chatbot
router.get('/chatbot/completion', chatbotController.getChatbotResponse);
router.post('/chatbot/conversation', chatbotController.postConversation);

module.exports = router;
