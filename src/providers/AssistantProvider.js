import Assistant from '../models/Assistant.js';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';

class AssistantProvider {

    /**
     * @var name: string
     */
    name = 'busonAssistant';

    /**
     * @var instructions: string
     */
    instructions = 'Você é um assistente pessoal para ajudar com informações sobre um sistema de gestão de onibus escolar.';

    /**
     * @var tools: string[]
     */
    tools = [];

    /**
     * @var model: string
     */
    model = 'gpt-4-turbo-preview';

    /**
     * @var openai: OpenAI
    */
    openai;

    constructor(openai) {
        this.openai = openai;
    }

    /**
     * 
     * @returns {Promise<import('openai/src/resources/beta/index.js').Assistant>}
     */
    async getAssistant() {
        const dbAssistant = await Assistant.findOne();

        if (!dbAssistant) {
            const assistant = await this.createAssistant();
            return assistant;
        }

        const assistant = await this.openai.beta.assistants.retrieve(
            dbAssistant.api_id
        );

        return assistant;
    }

    /**
     * 
     * @returns {Promise<import('openai/src/resources/beta/index.js').Assistant>}
     */
    async createAssistant() {
        const assistant = await this.openai.beta.assistants.create({
            name: this.name,
            instructions: this.instructions,
            tools: this.tools,
            model: this.model
        });

        this.saveAssistant(assistant);

        return assistant;
    }

    /**
     * @param {import('openai/resources/beta/index.mjs').Assistant} assistant 
     * 
     * @returns {Promise<void>}
     */
    async saveAssistant(assistant) {
        await Assistant.create({
            api_id: assistant.id,
            created_at: assistant.created_at,
            name: assistant.name,
            description: assistant.description,
            model: assistant.model,
            instructions: assistant.instructions,
            situacao: AtivoInativoEnum.ATIVO
        });
    }
}

export default AssistantProvider;