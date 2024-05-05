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
     * @var applicationContext: string
     */
    applicationContext;

    /**
     * @var applicationDataStructure: string
     */
    applicationDataStructure;

    /**
     * @var instructions: string
     */
    instructions;

    /**
     * @var prompt: string
     */
    prompt;

    /**
     * @var responseFormat: string
     */
    responseFormat;

    /**
     * @var adtionalInformation: string
     */
    aditionalInformation;

    /**
     * Constructor for the AssistantContextInstruction class.
     * 
     * @param {string} prompt
     * @param {string} aditionalInformation
     * 
     * @returns {AssistantContextInstruction}
     */
    constructor(prompt, aditionalInformation) {
        this.applicationContext = this.#setApplicationContext();
        this.applicationDataStructure = this.#setApplicationDataStructure();
        this.instructions = this.#setInstructions();
        this.prompt = this.#setPrompt(prompt);
        this.responseFormat = this.#setResponseFormat();
        this.aditionalInformation = this.#setAditionalInformation(aditionalInformation);
    }

    /**
     * Method to convert object to string
     * 
     * @returns {Promise<AssistantContextInstruction>}
    */
    async toString() {
        console.log(this);
        return this;
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

        this.applicationContext = `
        Contexto da aplicação:
        ${context}
        `;
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

        this.applicationDataStructure = `
        Relação de tabelas da aplicação:
        ${dataStructure}
        `;
    }

    /**
     * Method to set instructions
     * 
     * @returns {Promise<void>}
     */
    async #setInstructions() {
        this.instructions = `
        Quais dados você precisa para responder esta pergunta? 
        Você deve especificar um dos models para obter os dados e um comando where para filtrar os dados.
        Uma nova mensagem será enviada com os dados do model escolhido.
        Caso não seja possível responder a pergunta somente com os dados do model, responda somente '204'.
        `;
    }

    /**
     * 
     * @param {string} prompt 
     * 
     * @returns {Promise<void>}
     */
    async #setPrompt(prompt) {
        this.prompt = prompt;
    }

    /**
     * Method to set response format
     * 
     * @returns {Promise<void>}
     */
    async #setResponseFormat() {
        this.responseFormat = `
        Responda em formato json encodado, exemplo:\`{"model": "usuarios","where": { "id": 1 }}\`
        `;
    }

    /**
     * 
     * @param {string} aditionalInformation 
     * 
     * @returns {Promise<void>}
     */
    async #setAditionalInformation(aditionalInformation) {
        this.aditionalInformation = aditionalInformation;
    }
}

module.exports = AssistantContextInstruction;