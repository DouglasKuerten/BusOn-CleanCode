import cron from 'node-cron';
import gerarPagamentos from './scripts/gerarPagamento.js';
import verificarPagamentosAtrasados from './scripts/verificarPagamentosAtrasados.js';

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