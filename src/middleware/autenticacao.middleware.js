const jwt = require("jsonwebtoken");
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
    }
    return res.sendStatus(401).send({ message: "Unauthorized!" });
}


const validarAutenticacao = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, jwtDataOptions.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.user = decoded;
        next();
    });
};

module.exports = {
    validarAutenticacao,
}