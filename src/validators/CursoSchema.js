import yup from 'yup';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';

const cursoSchema = yup.object().shape({
    nome: yup.string()
        .required('Nome é obrigatório')
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(255, 'Nome deve ter no máximo 255 caracteres'),
    situacao: yup
        .string()
        .oneOf(Object.keys(AtivoInativoEnum), `Situação inválida. Valores possíveis: ${Object.values(AtivoInativoEnum).join(', ')}`)
        .required('Situação é obrigatória'),
    instituicaoId: yup
        .number()
        .integer('ID da instituição deve ser um número inteiro')
        .required('ID da instituição é obrigatório')
        .positive('ID da instituição deve ser um número positivo')
});

export default cursoSchema; 