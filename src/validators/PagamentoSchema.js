const yup = require('yup');
const TipoPagamentoEnum = require('../enum/TipoPagamentoEnum');
const SituacaoPagamentoEnum = require('../enum/SituacaoPagamentoEnum');

const pagamentoSchema = yup.object().shape({
  txId: yup.string().nullable(),
  pixCopiaCola: yup.string().nullable(),
  usuarioId: yup.number().integer().required('Usuário ID é obrigatório.'),
  tipo: yup
    .string()
    .oneOf(Object.keys(TipoPagamentoEnum), `Tipo de pagamento inválido. Valores possíveis: ${Object.values(TipoPagamentoEnum).join(', ')}`)
    .required('Tipo de pagamento é obrigatório.'),
  valor: yup.number().required('Valor é obrigatório.'),
  multa: yup.number().nullable(),
  dataVencimento: yup.date().nullable(),
  dataPagamento: yup.date().nullable(),
  situacao: yup
    .string()
    .oneOf(Object.keys(SituacaoPagamentoEnum), `Situação inválida. Valores possíveis: ${Object.values(SituacaoPagamentoEnum).join(', ')}`)
    .required('Situação é obrigatória.'),
});

module.exports = pagamentoSchema;
