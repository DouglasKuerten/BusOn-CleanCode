const { config } = require("dotenv");
const OpenAI = require("openai");
const AssistantProvider = require('../providers/AssistantProvider');
const ThreadProvider = require("../providers/ThreadProvider");

/**
 * Represents a chat service for a personal assistant.
 */
class ChatService {

    /**
     * @var role: string
     */
    role = "user";

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
     * 
     * @returns {Promise<string>} The response from the assistant.
    */
    async messageAssistant(prompt) {

        const assistant = await this.assistantProvider.getAssistant();

        const thread = await this.threadProvider.getThread();

        const message = await this.openai.beta.threads.messages.create(
            thread.id,
            { role: this.role, content: prompt }
        );

        const run = await this.openai.beta.threads.runs.createAndPoll(
            thread.id,
            { assistant_id: assistant.id }
        );

        let content = "";
        if (run.status === 'completed') {
            const newMessage = await this.openai.beta.threads.messages.list(
                thread.id
            );
            for (const messages of newMessage.data) {
                if (content !== "") {
                    break;
                }
                content = content + messages.content[0].text.value;
            }
        }

        return {
            prompt: prompt,
            content: content,
            assistant: assistant,
            thread: thread,
            message: message,
            run: run
        };
    }
}

module.exports = ChatService;