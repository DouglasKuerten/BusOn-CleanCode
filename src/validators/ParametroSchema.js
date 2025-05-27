import yup from 'yup';
import LiberadoBloqueadoEnum from '../enum/LiberadoBloqueadoEnum.js';
import SimNaoEnum from '../enum/SimNaoEnum.js';

const parametroSchema = yup.object().shape({
  associacaoId: yup.number().integer().required('Associação ID é obrigatório.'),
  valor1: yup.number().required('Valor 1 é obrigatório.'),
  valor2: yup.number().required('Valor 2 é obrigatório.'),
  valor3: yup.number().required('Valor 3 é obrigatório.'),
  valor4: yup.number().required('Valor 4 é obrigatório.'),
  valor5: yup.number().required('Valor 5 é obrigatório.'),
  valor6: yup.number().required('Valor 6 é obrigatório.'),
  valorMulta: yup.number().required('Valor da multa é obrigatório.'),
  diaVencimento: yup.number().required('Dia de vencimento é obrigatório.'),
  diasToleranciaMulta: yup.number().required('Dias de tolerância da multa é obrigatório.'),
  liberaAlteracaoDadosPessoais: yup
    .string()
    .oneOf(
      Object.values(LiberadoBloqueadoEnum),
      'Liberação de alteração de dados pessoais inválida. Valores possíveis: ' + Object.values(LiberadoBloqueadoEnum).join(', ')
    )
    .required('Liberação de alteração de dados pessoais é obrigatório.'),
  gerarPagamentosAutomatico: yup
    .string()
    .oneOf(Object.values(SimNaoEnum), 'Geração de pagamentos automatico inválida. Valores possíveis: ' + Object.values(SimNaoEnum).join(', '))
    .required('Geração de pagamentos automatico é obrigatório.'),
});

export default parametroSchema;
