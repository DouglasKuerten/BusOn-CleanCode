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
     * Method to get object string
     * 
     * @param {string} prompt
     * @param {string} aditionalInformation
     * 
     * @returns {Promise<string>}
    */
    async toString(prompt, aditionalInformation) {
        return ''.concat([
            JSON.stringify(await this.#setApplicationContext()),
            JSON.stringify(await this.#setApplicationDataStructure()),
            JSON.stringify(await this.#setInstructions()),
            JSON.stringify(await this.#setPrompt(prompt)),
            JSON.stringify(await this.#setResponseFormat()),
            JSON.stringify(await this.#setAditionalInformation(aditionalInformation))
        ]);
    }

    /**
     * Method to set application context
     * 
     * @returns {Promise<void>}
     */
    async #setApplicationContext() {
        const context = {
            data: new Date().toISOString(),
        }

        return {
            instruction: 'Dados da aplicação',
            data: context
        };
    }

    /**
     * Method to set application data structure
     * 
     * @returns {Promise<void>}
     */
    async #setApplicationDataStructure() {
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
     * Method to set instructions
     * 
     * @returns {Promise<void>}
     */
    async #setInstructions() {
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
    async #setPrompt(prompt) {
        return {
            instruction: 'Prompt do usuario',
            data: prompt
        };
    }

    /**
     * Method to set response format
     * 
     * @returns {Promise<void>}
     */
    async #setResponseFormat() {
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
    async #setAditionalInformation(aditionalInformation) {
        return {
            instruction: 'Informações adicionais',
            data: aditionalInformation
        };
    }
}

module.exports = AssistantContextInstruction;