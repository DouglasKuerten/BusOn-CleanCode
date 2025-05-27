import { config } from "dotenv";
import OpenAI from "openai";

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

export default AiChatAdapter;