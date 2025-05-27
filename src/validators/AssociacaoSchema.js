import * as yup from 'yup';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';

const associacaoSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required('CNPJ é obrigatório')
    .matches(/^\d{14}$/, 'CNPJ deve conter 14 dígitos numéricos'),
  nome: yup.string().required('Nome é obrigatório'),
  sigla: yup.string().required('Sigla é obrigatória'),
  cidade: yup.string().required('Cidade é obrigatória'),
  bairro: yup.string().required('Bairro é obrigatório'),
  endereco: yup.string().required('Endereço é obrigatório'),
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{8}$/, 'CEP deve conter 8 dígitos numéricos'),
  uf: yup
    .string()
    .required('UF é obrigatório')
    .length(2, 'UF deve conter 2 letras')
    .uppercase(),
  situacao: yup
    .mixed()
    .oneOf(Object.keys(AtivoInativoEnum), 'Situação inválida')
    .required('Situação é obrigatória'),
  logoUrl: yup.string().url('URL do logo inválida').nullable(),
  logoDeclaracaoUrl: yup
    .string()
    .url('URL do logo da declaração inválida')
    .nullable(),
});

export default associacaoSchema;
