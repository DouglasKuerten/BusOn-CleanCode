'use strict';
const AiChatAdapter = require('../adapters/aiChatAdapter');

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

const messageAssistant = async (req, res) => {
    try {
        const prompt = req.body.prompt;

        res.status(201).json({
            message: prompt,
            response: 'completion.message.content',
        });

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter resposta do chatbot', error: error.message });
    }
};

module.exports = {
    getChatbotResponse,
    messageAssistant
};
