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
     * @param {Assistant} assistant The assistant to send the message to.
     * @param {Thread} thread The thread to send the message to.
     * 
     * @returns {Promise<string>}
     */
    async sendMessage(message, assistant, thread) {

        await this.openai.beta.threads.messages.create(
            thread.id,
            { role: this.role, content: message }
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

        return content;
    }
}

module.exports = MessageProvider;