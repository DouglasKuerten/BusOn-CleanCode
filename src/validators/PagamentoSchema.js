import yup from 'yup';
import TipoPagamentoEnum from '../enum/TipoPagamentoEnum.js';
import SituacaoPagamentoEnum from '../enum/SituacaoPagamentoEnum.js';

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

export default pagamentoSchema;
