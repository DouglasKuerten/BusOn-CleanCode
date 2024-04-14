const { config } = require("dotenv");
const OpenAI = require("openai");
const AssistantProvider = require('../providers/AssistantProvider');
const Thread = require("../models/thread");

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
     * Constructor for the ChatService class.
     */
    constructor() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.assistantProvider = new AssistantProvider(this.openai);
    }

    /**
     * Sends a message to the assistant.
     * 
     * @param {string} message The message to send to the assistant.
     * @param {string|null} conversationId The id to the conversation.
     * 
     * @returns {Promise<string>} The response from the assistant.
    */
    async messageAssistant(message, conversationId) {

        const assistant = await this.assistantProvider.getAssistant();

        const thread = await this.getThread(conversationId);

        return {
            message: message,
            response: "Hello, how are you?",
            assistant: assistant,
            thread: thread
        };
    }

    /**
     * Get thread to assistant.
     * 
     * @param {string | null} threadId The id to the thread.
     * 
     * @returns {Promise<void>}
     */
    async getThread(threadId) {

        const dbThread = await Thread.findOne();

        if (!dbThread) {
            const newThread = await this.createNewThread();
            return newThread;
        }

        const thread = await this.openai.beta.threads.retrieve(
            dbThread.api_id
        );

        return thread;
    }

    /**
     * Save thread.
     * 
     * @param {import("openai/resources/beta/index.mjs").Thread} thread
     * 
     * @returns {Promise<void>}
     */
    async saveThread(thread) {
        await Thread.create({
            api_id: thread.id,
            created_at: thread.created_at,
        });
    }

    /**
     * 
     * @returns {Promise<Assistant>}
    */
    async createNewThread() {
        const thread = await this.openai.beta.threads.create();

        this.saveThread(thread);

        return thread;
    }

    /**
     * Sends a message to the assistant.
     */
    async assistantPoc() {
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

module.exports = ChatService;