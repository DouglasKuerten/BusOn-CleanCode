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
        let dados;
        try {
            // Converter a string de consulta em um objeto JavaScript
            const queryObject = JSON.parse(query);

            console.log(queryObject);

            if (queryObject.earlyReturn) {
                return queryObject;
            }

            // Extrair o nome do modelo e os critérios de busca
            const model = queryObject.data.model;
            const method = queryObject.data.method;
            const where = queryObject.data.where;
            const attributes = queryObject.data.attributes;
            const order = queryObject.data.order;

            let dbModel;
            switch (model) {
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

            // Buscar dados do banco de dados
            const result = await dbModel[method]({
                attributes: attributes,
                where: where,
                order: order
            });

            dados = JSON.stringify(result);

        } catch (error) {
            console.error(error);
            return {
                error: true,
                message: 'Não foi possível buscar dados da aplicação.',
                trace: error
            };
        }

        return {
            error: false,
            content: dados
        }
    }

}

module.exports = AssistantQueryResponse;