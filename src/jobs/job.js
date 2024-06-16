const cron = require('node-cron');
const gerarPagamentos = require('./scripts/gerarPagamento');
const verificarPagamentosAtrasados = require('./scripts/verificarPagamentosAtrasados');

// Job para rodar no dia 1 de cada mês à meia-noite
cron.schedule('0 0 1 * *', () => {
    console.log('Executando job mensal...');
    gerarPagamentos();
});

// Job para rodar todo dia à meia-noite
cron.schedule('0 0 * * *', () => {
    console.log('Executando job validar mensalidade...');
    verificarPagamentosAtrasados();
});