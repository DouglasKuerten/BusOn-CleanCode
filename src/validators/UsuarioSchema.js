import * as yup from 'yup';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import TipoAcessoEnum from '../enum/TIpoAcessoEnum.js';
import DiasSemanaEnum from '../enum/DiasSemanaEnum.js';

export const usuarioSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  cidade: yup.string().nullable(),
  cpf: yup.string().nullable(),
  matricula: yup.string().nullable(),
  cursoId: yup.number().nullable(),
  associacaoId: yup.number().nullable(),
  dataEntradaAssociacao: yup.date().nullable(),
  tipoAcesso: yup
    .string()
    .oneOf(
      Object.values(TipoAcessoEnum),
      'Tipo de acesso inválido. Valores possíveis: ' +
        Object.values(TipoAcessoEnum).join(', '),
    )
    .required('Tipo de acesso é obrigatório'),
  cargo: yup.string().nullable(),
  situacao: yup
    .string()
    .oneOf(
      Object.values(AtivoInativoEnum),
      'Situação inválida. Valores possíveis: ' +
        Object.values(AtivoInativoEnum).join(', '),
    )
    .required('Situação é obrigatória'),
  diasUsoTransporte: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(
          Object.values(DiasSemanaEnum),
          'Dia da semana inválido. Valores possíveis: ' +
            Object.values(DiasSemanaEnum).join(', '),
        ),
    )
    .nullable(),
  exigirRedefinicaoSenha: yup.boolean().default(false),
});

export const atualizarSenhaSchema = yup.object().shape({
  senhaAntiga: yup.string().required('Senha antiga é obrigatória'),
  senhaNova: yup
    .string()
    .required('Nova senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
