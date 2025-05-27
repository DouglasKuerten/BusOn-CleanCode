import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  senha: yup.string().required('Senha é obrigatória'),
});

export const refreshTokenSchema = yup.object().shape({
  refreshToken: yup.string().required('Refresh token é obrigatório'),
});
