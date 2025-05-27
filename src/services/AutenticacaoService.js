import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import TokenAutenticacao from '../models/TokenAutenticacao.js';
import Associacao from '../models/Associacao.js';
import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import { loginSchema, refreshTokenSchema } from '../validators/AutenticacaoSchema.js';
import BusonException from '../exceptions/BusonException.js';
import { StatusCodes } from 'http-status-codes';

class AutenticacaoService {
    async login(body) {
        await loginSchema.validate(body);
        const { email, senha } = body;
        const user = await Usuario.findOne({
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'sigla']
                },
                {
                    model: Curso,
                    attributes: ['id', 'nome'],
                    include: [{
                        model: Instituicao,
                        attributes: ['id', 'nome'],
                    }]
                }
            ],
            where: { email: email?.toLowerCase() }
        });

        if (!user) {
            throw new BusonException(StatusCodes.NOT_FOUND, 'E-mail informado não foi encontrado');
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            throw new BusonException(StatusCodes.UNAUTHORIZED, 'Senha informada está incorreta');
        }

        const refreshToken = await TokenAutenticacao.criarToken(user);

        const token = jwt.sign(
            {
                refreshToken: refreshToken,
                usuarioId: user.id,
                email: user.email,
                tipoAcesso: user.tipoAcesso
            },
            process.env.JWT_SECRET,
            {
                expiresIn: Number(process.env.JWT_EXPIRATION),
            }
        );

        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            endereco: user.endereco,
            cursoId: user.cursoId,
            cursoNome: user.curso?.nome,
            instituicaoNome: user.curso?.instituicao?.nome,
            associacaoId: user.associacaoId,
            associacaoSigla: user.associacao?.sigla,
            dataEntradaAssociacao: user.dataEntradaAssociacao,
            tipoAcesso: user.tipoAcesso,
            situacao: user.situacao,
            accessToken: token,
            refreshToken: refreshToken,
            exigirRedefinicaoSenha: user.exigirRedefinicaoSenha,
            fotoUrl: user.fotoUrl
        };
    }

    async refreshToken(body) {
        await refreshTokenSchema.validate(body);
        const { refreshToken: requeshToken } = body;

        const refreshToken = await TokenAutenticacao.findOne({ where: { token: requeshToken } });
        if (!refreshToken) {
            throw new BusonException(StatusCodes.UNAUTHORIZED, 'Invalid refresh token');
        }

        if (TokenAutenticacao.verificarDataValidade(refreshToken)) {
            await TokenAutenticacao.destroy({ where: { id: refreshToken.id } });
            throw new BusonException(StatusCodes.UNAUTHORIZED, 'Refresh token was expired. Please make a new sign in request');
        }

        const user = await Usuario.findOne({
            where: { id: refreshToken.usuarioId },
            attributes: {
                exclude: ['password']
            }
        });

        const newAccessToken = jwt.sign(
            {
                usuarioId: user.id,
                email: user.email,
                tipoAcesso: user.tipoAcesso
            },
            process.env.JWT_SECRET,
            {
                expiresIn: Number(process.env.JWT_EXPIRATION),
            }
        );

        return {
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        };
    }

    async validateToken(user) {
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            endereco: user.endereco,
            cursoId: user.cursoId,
            cursoNome: user.curso?.nome,
            instituicaoNome: user.curso?.instituicao?.nome,
            associacaoId: user.associacaoId,
            associacaoSigla: user.associacao?.sigla,
            dataEntradaAssociacao: user.dataEntradaAssociacao,
            tipoAcesso: user.tipoAcesso,
            situacao: user.situacao,
            exigirRedefinicaoSenha: user.exigirRedefinicaoSenha,
            fotoUrl: user.fotoUrl
        };
    }
}

export default new AutenticacaoService();
