const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const jwtDataOptions = {
    secret: process.env.JWT_SECRET,
    jwtExpiration: Number(process.env.JWT_EXPIRATION),
    jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION),
}
const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        console.log(err)
        return res.status(401).send({ message: "Unauthorized! Access Token expired!" });
    } else {
        return res.status(401).send({ message: "Unauthorized!" });
    }
}


const validarAutenticacao = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    } else {
        jwt.verify(token, jwtDataOptions.secret, async (err, decoded) => {
            if (err) {
                return catchError(err, res);
            } else {
                const dadosUsuario = await Usuario.findOne({ where: { email: decoded?.email?.toLowerCase() } })
                req.user = dadosUsuario;
                next();
            }
        });
    }
};

module.exports = {
    validarAutenticacao,
}