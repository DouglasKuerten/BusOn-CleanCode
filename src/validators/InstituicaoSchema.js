const yup = require('yup');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');

const instituicaoSchema = yup.object().shape({
    nome: yup.string()
        .required('Nome é obrigatório')
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(255, 'Nome deve ter no máximo 255 caracteres'),
    endereco: yup.string()
        .required('Endereço é obrigatório')
        .min(5, 'Endereço deve ter pelo menos 5 caracteres')
        .max(255, 'Endereço deve ter no máximo 255 caracteres'),
    situacao: yup
        .string()
        .oneOf(Object.keys(AtivoInativoEnum), `Situação inválida. Valores possíveis: ${Object.values(AtivoInativoEnum).join(', ')}`)
        .required('Situação é obrigatória'),
    associacaoId: yup
        .number()
        .integer('ID da associação deve ser um número inteiro')
        .required('ID da associação é obrigatório')
        .positive('ID da associação deve ser um número positivo'),
    logoUrl: yup
        .string()
        .nullable()
});

module.exports = instituicaoSchema; 