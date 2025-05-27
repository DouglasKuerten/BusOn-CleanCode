import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import Usuario from '../models/Usuario.js';
import Associacao from '../models/Associacao.js';
import Pagamento from '../models/Pagamento.js';

/**
 * Represents a context instruction for the assistant.
 */
class AssistantContextInstruction {

    /**
     * @var string: aditionalInformation
     */
    aditionalInformation = '';

    /**
     * Method to get object string
     * 
     * @param {string} prompt
     * 
     * @returns {Promise<string>}
    */
    async toString(prompt) {
        return `
            ${await this._getApplicationContext()}
            ${await this._getApplicationDataStructure()}
            ${await this._getInstructions()}
            ${await this._getResponseFormat()}
            ${await this._getPrompt(prompt)}
            ${await this._getAditionalInformation()}
        `;
    }

    /**
     * Method to set aditional information
     * 
     * @param {string} aditionalInformation
     * 
     * @returns {Promise<void>}
    */
    async setAditionlInformation(aditionalInformation) {
        this.aditionalInformation = aditionalInformation;
    }

    /**
     * Method to get application context
     * 
     * @returns {Promise<string>}
     */
    async _getApplicationContext() {
        const data = new Date().toISOString();

        return `
            Dados da aplicação: 
            Data Atual: ${data}
        `;
    }

    /**
     * Method to get instructions
     * 
     * @returns {Promise<string>}
     */
    async _getInstructions() {
        return `
            Você deve criar uma query para consultar os models da aplicação e conseguir os dados para responder a pergunta usando sequelize. 
            Gere a query e envie no campo "jsonQueryString".

            Uma nova mensagem será enviada com os dados do model escolhido.

            Caso não seja possível responder a pergunta somente com os dados do model, 
            "earlyReturn" deve ser true e "status" deve ser 204 e a sua mensagem deve ser enviada no campo "message".

            Caso não seja necessário realizar consultas no banco de dados, responda normalmente utilizando somente plain text com o modelo: 
            "earlyReturn" deve ser true e "status" deve ser 200 e a sua resposta deve ser enviada no campo "message".
        `;
    }

    /**
     * Method to get prompt
     * 
     * @param {string} prompt 
     * 
     * @returns {Promise<string>}
     */
    async _getPrompt(prompt) {
        return `
            Prompt do usuario: ${prompt}
        `;
    }

    /**
     * Method to get aditional information
     * 
     * @returns {Promise<string>}
     */
    async _getAditionalInformation() {
        return `
            Informações adicionais:
            Estas instruções serão enviadas em todas as mensagens e não devem ser consideradas como parte da resposta.
            ${this.aditionalInformation}
        `;
    }

    /**
     * Method to get application data structure
     * 
     * @returns {Promise<string>}
     */
    async _getApplicationDataStructure() {
        const dataStructure = {
            usuarios: await Usuario.describe(),
            pagamentos: await Pagamento.describe(),
            instituicoes: await Instituicao.describe(),
            cursos: await Curso.describe(),
            associacaos: await Associacao.describe(),
        }

        return `
            Relação de tabelas da aplicação,
            ${JSON.stringify(dataStructure)}
        `;
    }

    /**
     * Method to get response format
     * 
     * @returns {Promise<string>}
     */
    async _getResponseFormat() {
        return `
            As suas respostas devem sempre estar no formato json abaixo. O json deve ser serializado para string antes de ser enviado.
            Retorne somente texto simples.
            Exemplo:
            {
                "earlyReturn": false,
                "status": 200,
                "data": {
                    "jsonQueryString": {
                        "model": "usuarios",
                        "method": "findAll",
                        "attributes": ["id", "nome", "tipoAcesso", "situacao", "diasUsoTransporte"],
                        "where": { "id": 1, "nome": "Jhon" },
                        "order": [["id", "DESC"], ["nome", "ASC"]],
                        "include": [
                            {
                                "model": "associacao",
                                "attributes": ["id", "nome"]
                            },
                            {
                                "model": "curso",
                                "attributes": ["id", "nome"],
                                "include": [
                                    {
                                        "model": "instituicao",
                                        "attributes": ["id", "nome"]
                                    }
                                ]
                            }
                        ]
                    },
                    "message": null
                }
            }
        `;
    }
}

export default AssistantContextInstruction;