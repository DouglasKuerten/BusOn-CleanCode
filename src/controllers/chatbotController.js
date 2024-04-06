'use strict';
const AiChatAdapter = require('../adapters/aiChatAdapter');

// Controller para obter uma resposta do chatbot
const getChatbotResponse = async (req, res) => {
    try {
        const aichat = new AiChatAdapter();
        aichat.createCompletion("What is the meaning of life?").then(completion => {
            res.status(200).json({
                mensagem: 'Resposta do chatbot obtida com sucesso',
                resposta: completion.message.content,
            });
        });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter resposta do chatbot', error: error.message });
    }
};

module.exports = {
    getChatbotResponse
};
