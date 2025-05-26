const yup = require('yup');

const associacaoSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  cnpj: yup.string().required('CNPJ é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  endereco: yup.string().required('Endereço é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
});

module.exports = associacaoSchema;
