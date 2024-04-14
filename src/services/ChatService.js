const { config } = require("dotenv");
const OpenAI = require("openai");
const AssistantProvider = require('../providers/AssistantProvider');
const ThreadProvider = require("../providers/ThreadProvider");

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
     * Constructor for the ChatService class.
     */
    constructor() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.assistantProvider = new AssistantProvider(this.openai);
        this.threadProvider = new ThreadProvider(this.openai);
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

        const thread = await this.threadProvider.getThread(conversationId);

        return {
            message: message,
            response: "Hello, how are you?",
            assistant: assistant,
            thread: thread
        };
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