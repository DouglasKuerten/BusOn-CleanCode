const { config } = require("dotenv");
const OpenAI = require("openai");

class AiChatAdapter {
    constructor() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    async createCompletion(prompt) {
        const completion = await this.openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
        });

        return completion.choices[0];
    }
}

module.exports = AiChatAdapter;