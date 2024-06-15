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
            JSON.stringify(await this.#getApplicationContext()),
            JSON.stringify(await this.#getApplicationDataStructure()),
            JSON.stringify(await this.#getInstructions()),
            JSON.stringify(await this.#getPrompt(prompt)),
            JSON.stringify(await this.#getResponseFormat()),
            JSON.stringify(await this.#getAditionalInformation())
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
    async #getApplicationContext() {
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
    async #getApplicationDataStructure() {
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
    async #getInstructions() {
        const instructions = `Quais dados você precisa para responder esta pergunta? 
        Você deve especificar um dos models para obter os dados e um comando where para filtrar os dados.
        Uma nova mensagem será enviada com os dados do model escolhido.
        Caso não seja possível responder a pergunta somente com os dados do model, responda somente '204'.`;

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
    async #getPrompt(prompt) {
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
    async #getResponseFormat() {
        return {
            instruction: 'Responda em formato json encodado, exemplo:',
            data: `{"model": "usuarios","where": { "id": 1 }}`
        };
    }

    /**
     * 
     * @param {string} aditionalInformation 
     * 
     * @returns {Promise<void>}
     */
    async #getAditionalInformation(aditionalInformation) {
        return {
            instruction: 'Informações adicionais',
            data: aditionalInformation
        };
    }
}

module.exports = AssistantContextInstruction;