const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const Usuario = require('../models/usuario');
const Associacao = require('../models/associacao');
const Pagamento = require('../models/pagamento');

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
            const queryObject = JSON.parse(query);
            if (queryObject.earlyReturn) {
                return queryObject;
            }

            const { model, method, where, attributes, order, include } = queryObject.data;
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
                dbModel = Usuario;
                break;
            case 'pagamentos':
                dbModel = Pagamento;
                break;
            case 'instituicoes':
                dbModel = Instituicao;
                break;
            case 'cursos':
                dbModel = Curso;
                break;
            case 'associacaos':
                dbModel = Associacao;
                break;
        }

        if (!dbModel) {
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

module.exports = AssistantQueryResponse;