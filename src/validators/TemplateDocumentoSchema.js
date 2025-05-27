import * as yup from 'yup';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import TipoImpressaoEnum from '../enum/TipoImpressaoEnum.js';

export const templateDocumentoSchema = yup.object().shape({
  associacaoId: yup.number().required('ID da associação é obrigatório'),
  nome: yup.string().required('Nome é obrigatório'),
  situacao: yup
    .string()
    .oneOf(
      Object.values(AtivoInativoEnum),
      'Situação inválida. Valores possíveis: ' +
        Object.values(AtivoInativoEnum).join(', '),
    )
    .required('Situação é obrigatória'),
  tipoImpressao: yup
    .string()
    .oneOf(
      Object.values(TipoImpressaoEnum),
      'Tipo de impressão inválido. Valores possíveis: ' +
        Object.values(TipoImpressaoEnum).join(', '),
    )
    .required('Tipo de impressão é obrigatório'),
  htmlTemplate: yup.string().required('Template HTML é obrigatório'),
});
