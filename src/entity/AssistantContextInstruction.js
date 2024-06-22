const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const Usuario = require('../models/usuario');
const Associacao = require('../models/associacao');
const Pagamento = require('../models/pagamento');

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
        return ''.concat([
            JSON.stringify(await this._getApplicationContext()),
            JSON.stringify(await this._getApplicationDataStructure()),
            JSON.stringify(await this._getInstructions()),
            JSON.stringify(await this._getPrompt(prompt)),
            JSON.stringify(await this._getResponseFormat()),
            JSON.stringify(await this._getAditionalInformation())
        ]);
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
     * @returns {Promise<void>}
     */
    async _getApplicationContext() {
        const context = {
            data: new Date().toISOString(),
        }

        return {
            instruction: 'Dados da aplicação',
            data: context
        };
    }

    /**
     * Method to get application data structure
     * 
     * @returns {Promise<void>}
     */
    async _getApplicationDataStructure() {
        const dataStructure = {
            usuarios: await Usuario.describe(),
            pagamentos: await Pagamento.describe(),
            instituicoes: await Instituicao.describe(),
            cursos: await Curso.describe(),
            associacaos: await Associacao.describe(),
        }

        return {
            instruction: 'Relação de tabelas da aplicação',
            data: dataStructure
        };
    }

    /**
     * Method to get instructions
     * 
     * @returns {Promise<void>}
     */
    async _getInstructions() {
        const instructions =
            `Quais dados você precisa para responder esta pergunta? 
        Uma nova mensagem será enviada com os dados do model escolhido.
        Caso não seja possível responder a pergunta somente com os dados do model, responda utilizando somente plain text com o modelo: 
        {"earlyReturn": true,"status": 204,"data": { "message": "Escreva a mensagem de resposta aqui"}}
        Caso não seja necessário realizar consultas no banco de dados, responda utilizando somente plain text com o modelo: 
        {"earlyReturn": true,"status": 200,"data": { "message": "Escreva a mensagem de resposta aqui"}}`;

        return {
            instruction: 'Instruções',
            data: instructions
        }
    }

    /**
     * 
     * @param {string} prompt 
     * 
     * @returns {Promise<void>}
     */
    async _getPrompt(prompt) {
        return {
            instruction: 'Prompt do usuario',
            data: prompt
        };
    }

    /**
     * Method to get response format
     * 
     * @returns {Promise<void>}
     */
    async _getResponseFormat() {
        return {
            instruction: `
            Você deve criar uma consulta a um model usando sequelize.
            Responda em formato json valido encodado, exemplo:`,
            data: `{
                "earlyReturn": false,
                "status": 200,
                "data": {
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
                }
            }`
        };
    }

    /**
     * 
     * @param {string} aditionalInformation 
     * 
     * @returns {Promise<void>}
     */
    async _getAditionalInformation(aditionalInformation) {
        return {
            instruction: 'Informações adicionais',
            data: aditionalInformation
        };
    }
}

module.exports = AssistantContextInstruction;