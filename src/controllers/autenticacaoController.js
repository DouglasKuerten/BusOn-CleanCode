'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const TokenAutenticacao = require('../models/tokenAutenticacao');
const Associacao = require('../models/associacao');
const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');

// Função para autenticar o usuário e gerar um token JWT
const authenticateUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verificar se o usuário existe
        const user = await Usuario.findOne(
            {
                include: [
                    {
                        model: Associacao,
                        attributes: ['id', 'nome']
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
            return res.status(404).json({ message: 'E-mail informado não foi encontrado' });
        }

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha informada está incorreta' });
        }

        let refreshToken = await TokenAutenticacao.criarToken(user);

        // Gerar token JWT
        const token = jwt.sign({ refreshToken: refreshToken, usuarioId: user.id, email: user.email, tipoAcesso: user.tipoAcesso }, process.env.JWT_SECRET, {
            expiresIn: Number(process.env.JWT_EXPIRATION),
        });

        // Criar refreshToken
        res.status(200).json({
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            endereco: user.endereco,
            cursoId: user.cursoId,
            cursoNome: user.curso?.nome,
            instituicaoNome: user.curso?.instituicao?.nome,
            associacaoId: user.associacaoId,
            associacaoNome: user.associacao?.nome,
            dataEntradaAssociacao: user.dataEntradaAssociacao,
            tipoAcesso: user.tipoAcesso,
            situacao: user.situacao,
            accessToken: token,
            refreshToken: refreshToken,
            exigirRedefinicaoSenha: user.exigirRedefinicaoSenha,
            fotoUrl: user.fotoUrl
        });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ message: 'Erro ao autenticar usuário', error: error.message });
    }
};

// Função para atualizar o token de acesso (refreshToken)
const refreshToken = async (req, res) => {
    try {
        const { refreshToken: requestToken } = req.body;
        if (requestToken == null) {
            return res.status(403).json({ error: "Refresh Token is required!" });
        }

        let refreshToken = await TokenAutenticacao.findOne({ where: { token: requestToken } });
        if (!refreshToken) {
            res.status(403).json({ error: "Invalid refresh token" });
            return;
        }

        if (TokenAutenticacao.verificarDataValidade(refreshToken)) {
            TokenAutenticacao.destroy({ where: { id: refreshToken.id } });
            res.status(403).json({ error: "Refresh token was expired. Please make a new sign in request" });
            return;
        }

        const user = await Usuario.findOne({
            where: { id: refreshToken.usuarioId },
            attributes: {
                exclude: ['password']
            }
        });

        const newAccessToken = jwt.sign({ usuarioId: user.id, email: user.email, tipoAcesso: user.tipoAcesso }, process.env.JWT_SECRET, {
            expiresIn: Number(process.env.JWT_EXPIRATION),
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        console.log('err', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const validateToken = async (req, res) => {
    const user = req.user.dataValues;
    res.status(200).json({
        message: 'Usuário está com token ativo', user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            endereco: user.endereco,
            cursoId: user.cursoId,
            cursoNome: user.curso?.nome,
            instituicaoNome: user.curso?.instituicao?.nome,
            associacaoId: user.associacaoId,
            associacaoNome: user.associacao?.nome,
            dataEntradaAssociacao: user.dataEntradaAssociacao,
            tipoAcesso: user.tipoAcesso,
            situacao: user.situacao,
            exigirRedefinicaoSenha: user.exigirRedefinicaoSenha,
            fotoUrl: user.fotoUrl
        }
    })
}

module.exports = {
    authenticateUsuario,
    refreshToken,
    validateToken
};
