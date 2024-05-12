const { config } = require("dotenv");
const OpenAI = require("openai");
const AssistantProvider = require('../providers/AssistantProvider');
const ThreadProvider = require("../providers/ThreadProvider");
const MessageProvider = require("../providers/MessageProvider");
const { Sequelize } = require('sequelize');
const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const Usuario = require('../models/usuario');
const Associacao = require('../models/associacao');
const Pagamento = require('../models/pagamento');
const AssistantContextInstruction = require('../entity/AssistantContextInstruction');
const AssistantQueryResponse = require("../entity/AssistantQueryResponse");

/**
 * Represents a chat service for a personal assistant.
 */
class ChatService {

    /**
     * @var openai: OpenAI
     */
    openai;

    /**
     * @var assistantProvider: AssistantProvider
     */
    assistantProvider;

    /**
     * @var threadProvider: ThreadProvider
     */
    threadProvider;

    /**
     * @var messageProvider: MessageProvider
     */
    messageProvider;

    /**
     * Constructor for the ChatService class.
     */
    constructor() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.assistantProvider = new AssistantProvider(this.openai);
        this.threadProvider = new ThreadProvider(this.openai);
        this.messageProvider = new MessageProvider(this.openai);
    }

    /**
     * Sends a message to the assistant.
     * 
     * @param {string} message The message to send to the assistant.
     * 
     * @returns {Promise<{prompt:string, content:string}>} The response from the assistant.
    */
    async messageAssistant(prompt) {
        const assistant = await this.assistantProvider.getAssistant();
        const thread = await this.threadProvider.getThread();

        const adicionalInformation = `Não formate o texto da mensagem como json, apenas responda usando plain text`;
        const assistantContextInstruction = new AssistantContextInstruction();
        const contextInstruction = await assistantContextInstruction.toString(prompt, adicionalInformation);

        const query = await this.messageProvider.sendMessage(contextInstruction, assistant, thread);

        const assistantQueryResponse = new AssistantQueryResponse(query);
        const dados = await assistantQueryResponse.readQuery();

        if (dados.error) {
            return {
                prompt: prompt,
                content: dados.message
            };
        }

        const promptWithQuery = `
            Resultado da consulta: ${dados.content}

            Prompt do usuario: '${prompt}'

            Realize a analise dos dados e responda a pergunta do usuario.
        `;

        const content = await this.messageProvider.sendMessage(promptWithQuery, assistant, thread);

        return {
            prompt: prompt,
            content: content,
            query: query,
            dados: dados,
            promptWithQuery: promptWithQuery,
            contextInstruction: contextInstruction,
        };
    }
}

module.exports = ChatService;