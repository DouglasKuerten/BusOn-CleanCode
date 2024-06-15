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
     * @param {string} id The thread ID.
     * 
     * @returns {Promise<{id: string, thread: import("openai/src/resources/beta/index.js").Thread}>}
     */
    async getThread(id) {

        const dbThread = await Thread.findByPk(id)

        if (!dbThread) {
            const newThread = await this.createNewThread();
            return newThread;
        }

        const thread = await this.openai.beta.threads.retrieve(
            dbThread.api_id
        );

        return {
            id: id,
            thread: thread
        };
    }

    /**
     * Save thread.
     * 
     * @param {import("openai/src/resources/beta/index.js").Thread} thread
     * 
     * @returns {Promise<string>}
     */
    async saveThread(thread) {
        const dbthread = await Thread.create({
            api_id: thread.id,
            created_at: thread.created_at,
        });

        return dbthread.id;
    }

    /**
     * Create new thread and save it.
     * 
     * @returns {Promise<{id: string, thread: import("openai/src/resources/beta/index.js").Thread}>}
    */
    async createNewThread() {
        const thread = await this.openai.beta.threads.create();

        const id = await this.saveThread(thread);

        return {
            id: id,
            thread: thread
        };
    }
}

module.exports = ThreadProvider;