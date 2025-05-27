import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import Usuario from '../models/usuario.js';
import Associacao from '../models/Associacao.js';
import Pagamento from '../models/Pagamento.js';

/**
 * Represents assistant query response.
 */
class AssistantQueryResponse {
    /**
     * Method to get the database data from the query.
     * 
     * @param {string} query The query to read.
     * 
     * @returns {Promise<object>}
    */
    async getDatabaseDataFromQuery(query) {
        try {
            console.log('Query:', query);
            const queryObject = JSON.parse(query);
            if (queryObject.earlyReturn) {
                return queryObject;
            }

            const { model, method, where, attributes, order, include } = queryObject.data.jsonQueryString;
            const queryOptions = {
                attributes,
                where,
                order,
                include: this._buildInclude(include)
            };

            // gets the primary model and execute the query
            const dbModel = this._getModel(model);
            const result = await dbModel[method](queryOptions);

            return {
                error: false,
                content: JSON.stringify(result),
            };
        } catch (error) {
            console.error(error);
            return {
                error: true,
                message: 'Não foi possível buscar dados da aplicação.',
                trace: error,
            };
        }
    }

    /**
     * Method to get the Sequelize model by name.
     * 
     * @param {string} modelName The model name.
     * 
     * @returns {import('sequelize').ModelCtor<any>}
     */
    _getModel(modelName) {
        let dbModel = null;
        switch (modelName) {
            case 'usuarios':
            case 'usuario':
                dbModel = Usuario;
                break;
            case 'pagamentos':
            case 'pagamento':
                dbModel = Pagamento;
                break;
            case 'instituicoes':
            case 'instituicao':
                dbModel = Instituicao;
                break;
            case 'cursos':
            case 'curso':
                dbModel = Curso;
                break;
            case 'associacaos':
            case 'associacao':
            case 'associacoes':
                dbModel = Associacao;
                break;
            default:
                throw new Error(`Model ${modelName} not found`);
        }
        return dbModel;
    }

    /**
     * Method to build include.
     * 
     * @param {Array<object>} includes The includes.
     * 
     * @returns {object}
     */
    _buildInclude(includes) {
        if (!Array.isArray(includes)) {
            return [];
        }

        return includes.map(include => ({
            model: this._getModel(include.model),
            attributes: include.attributes,
            include: this._buildInclude(include.include)
        }));
    }
}

export default AssistantQueryResponse;