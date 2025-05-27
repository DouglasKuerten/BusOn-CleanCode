import BusonException from '../exceptions/BusonException.js';
import { StatusCodes } from 'http-status-codes';

const validate = (schema, property = 'body') => (req, res, next) => {
    try {
        req[property] = schema.parse(req[property]);
        next();
    } catch (err) {
        if (err.errors) {
            const mensagens = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n');
            return next(new BusonException(StatusCodes.BAD_REQUEST, mensagens));
        }

        next(new BusonException(StatusCodes.BAD_REQUEST, err.message));
    }
};

export { validate };
