import { config } from "dotenv";
import OpenAI from "openai";

class AiAssistant {

    constructor() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.createAssistant();
    }

    async createAssistant() {
        const assistant = await this.openai.beta.assistants.create({
            name: "Math Tutor",
            instructions: "You are a personal math tutor. Write and run code to answer math questions.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4-turbo-preview"
        });

        const thread = await this.openai.beta.threads.create();

        const message = await this.openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: "Qual é meu bom, como está a vida?"
            }
        );

        let run = await this.openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: assistant.id,
                instructions: "Please address the user as Jane Doe. The user has a premium account."
            }
        );

        if (run.status === 'completed') {
            const messages = await this.openai.beta.threads.messages.list(
                run.thread_id
            );
            for (const message of messages.data.reverse()) {
                console.log(`${message.role} > ${message.content[0].text.value}`);
            }
        } else {
            console.log(run.status);
        }

        const message2 = await this.openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: "Qual foi a pergunta anterior?"
            }
        );

        let run2 = await this.openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: assistant.id,
                instructions: "Please address the user as Jane Doe. The user has a premium account."
            }
        );

        if (run2.status === 'completed') {
            const messages = await this.openai.beta.threads.messages.list(
                run2.thread_id
            );
            for (const message of messages.data.reverse()) {
                console.log(`${message.role} > ${message.content[0].text.value}`);
            }
        } else {
            console.log(run2.status);
        }
    }
}

new AiAssistant();