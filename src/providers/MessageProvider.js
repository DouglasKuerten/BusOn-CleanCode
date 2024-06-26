/**
 * Class to provide messages to the assistant.
 * 
 * @class MessageProvider
 * @property {string} role The role of the user.
 * @property {OpenAI} openai The OpenAI API instance.
 */
class MessageProvider {

    /**
     * @var role: string
     */
    role = "user";

    /**
     * @var openai: OpenAI
    */
    openai;

    constructor(openai) {
        this.openai = openai;
    }

    /**
     * Method to send a message to the assistant.
     * 
     * @param {string} message The message to send to the assistant.
     * @param {import("openai/src/resources/beta/index.js").Assistant} assistant The assistant to send the message to.
     * @param {import("openai/src/resources/beta/index.js").Thread} thread The thread to send the message to.
     * 
     * @returns {Promise<string>}
     */
    async sendMessage(message, assistant, thread) {

        await this._createMessage(message, thread.id);

        const run = await this._createRunWithPolling(thread.id, assistant.id);

        if (run.last_error !== null) {
            console.error(run.last_error);
            throw new Error('Erro ao enviar mensagem para o assistente.');
        }

        const content = await this._getAssistantReplyWithPolling(run, thread.id);

        return content;
    }

    /**
     * Method to get the assistant's reply with polling.
     * 
     * @param {import("openai/src/resources/beta/threads/index.js").Run} run The run to get the assistant's reply from.
     * @param {string} threadId The ID of the thread.
     * 
     * @returns {Promise<string>}
     */
    async _getAssistantReplyWithPolling(run, threadId) {

        let content = "";
        if (run.status === 'completed') {
            const newMessage = await this.openai.beta.threads.messages.list(
                threadId
            );
            for (const messages of newMessage.data) {
                if (content !== "") {
                    break;
                }
                content = content + messages.content[0].text.value;
            }
        }

        return content;
    }

    /**
     * Method to create a run with polling.
     * 
     * @param {string} threadId The ID of the thread.
     * @param {string} assistantId The ID of the assistant.
     * 
     * @returns {Promise<import("openai/src/resources/beta/threads/index.js").Run>}
     */
    async _createRunWithPolling(threadId, assistantId) {

        return await this.openai.beta.threads.runs.createAndPoll(
            threadId,
            { assistant_id: assistantId }
        );
    }

    /**
     * Method to create a message.
     * 
     * @param {string} message The message string to create.
     * @param {string} threadId The ID of the thread.
     * 
     * @returns {Promise<void>}
     */
    async _createMessage(message, threadId) {

        await this.openai.beta.threads.messages.create(
            threadId,
            { role: this.role, content: message }
        );
    }
}

module.exports = MessageProvider;