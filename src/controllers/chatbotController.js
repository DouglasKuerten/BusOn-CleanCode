'use strict';
const AiChatAdapter = require('../adapters/aiChatAdapter');
const ChatService = require('../services/ChatService');

// Controller para obter uma resposta do chatbot
const getChatbotResponse = async (req, res) => {
    try {
        const prompt = req.body.prompt; // Assuming prompt is sent in the request body
        const aichat = new AiChatAdapter();
        aichat.createCompletion(prompt).then(completion => {
            res.status(200).json({
                mensagem: 'Resposta do chatbot obtida com sucesso',
                resposta: completion.message.content,
            });
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter resposta do chatbot', error: error.message });
    }
};

const postConversation = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const chatService = new ChatService();
        const response = await chatService.messageAssistant(prompt);

        res.status(201).json({
            message: prompt,
            response: response
        });
    } catch (error) {
        return res.status(500).json(
            {
                message: 'Erro ao obter resposta do chatbot',
                error: error.message
            }
        );
    }
};

module.exports = {
    getChatbotResponse,
    postConversation
};
