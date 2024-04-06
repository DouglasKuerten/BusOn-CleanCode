import OpenAI from "openai";
import { config } from "dotenv";

class OpenAiCompletion {
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

new OpenAiCompletion().createCompletion("What is the meaning of life?").then(console.log);