const { z } = require('zod');

const pagamentoBodySchema = z.object({
    usuarioId: z.number({ required_error: 'usuarioId é obrigatório.' }),
    tipo: z.enum(['PIX', 'DINHEIRO', 'CARTAO']),
    valor: z.number().positive(),
    multa: z.number().nullable().optional(),
    dataVencimento: z.string().datetime().nullable().optional(),
    dataPagamento: z.string().datetime().nullable().optional(),
    situacao: z.enum(['PENDENTE', 'PAGO', 'ATRASADO']),
    txId: z.string().nullable().optional(),
    pixCopiaCola: z.string().nullable().optional(),
});

module.exports = {
    pagamentoBodySchema,
}