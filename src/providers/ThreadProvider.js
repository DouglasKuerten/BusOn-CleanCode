const Thread = require("../models/thread");

class ThreadProvider {

    /**
     * @var openai: OpenAI
    */
    openai;

    constructor(openai) {
        this.openai = openai;
    }

    /**
     * Get thread to assistant.
     * 
     * @returns {Promise<import("openai/resources/beta/index.mjs").Thread>}
     */
    async getThread() {

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
}

module.exports = ThreadProvider;