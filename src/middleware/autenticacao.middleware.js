import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import Associacao from '../models/Associacao.js';
import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import TokenAutenticacao from '../models/TokenAutenticacao.js';

const jwtDataOptions = {
  secret: process.env.JWT_SECRET,
  jwtExpiration: Number(process.env.JWT_EXPIRATION),
  jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION),
};
const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({ message: 'Unauthorized! Access Token expired!' });
  } else {
    return res.status(401).send({ message: 'Unauthorized!' });
  }
};

const validarAutenticacao = (req, res, next) => {
  let token = req.headers['authorization'].replace('Bearer ', '').trim();
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  } else {
    jwt.verify(token, jwtDataOptions.secret, async (err, decoded) => {
      if (err) {
        return catchError(err, res);
      } else {
        const storedToken = await TokenAutenticacao.findOne({
          where: { token: decoded.refreshToken },
        });

        if (!storedToken || TokenAutenticacao.verificarDataValidade(storedToken)) {
          return res.status(403).send({ message: 'Token not found or expired!' });
        }
        const dadosUsuario = await Usuario.findOne({
          include: [
            {
              model: Associacao,
              attributes: ['id', 'sigla'],
            },
            {
              model: Curso,
              attributes: ['id', 'nome'],
              include: [
                {
                  model: Instituicao,
                  attributes: ['id', 'nome'],
                },
              ],
            },
          ],
          where: { email: decoded?.email?.toLowerCase() },
        });
        req.user = dadosUsuario;
        next();
      }
    });
  }
};

const logout = async (req, res) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  } else {
    jwt.verify(token, jwtDataOptions.secret, async (err, decoded) => {
      if (err) {
        return catchError(err, res);
      } else {
        const storedToken = await TokenAutenticacao.findOne({
          where: { token: decoded.refreshToken },
        });

        if (!storedToken) {
          return res.status(404).send({ message: 'Refresh token not found!' });
        }

        await TokenAutenticacao.destroy({ where: { id: storedToken.id } });
        return res.status(200).send({ message: 'Logged out successfully!' });
      }
    });
  }
};

export {
  validarAutenticacao,
  logout,
};
