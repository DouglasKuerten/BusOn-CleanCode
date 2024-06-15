// app.js
const cron = require('node-cron');
const gerarPagamentos = require('./scripts/gerarPagamento');

// Agende o job para rodar no dia 1 de cada mês à meia-noite
cron.schedule('0 0 1 * *', () => {
    console.log('Executando job mensal...');
    gerarPagamentos();
});

console.log('Agendamento configurado');