/**
 * Class to generate instructions for the assistant with query data.
 */
class AssistantQueryDataInstructions {

    /**
     * Method to get query data instructions.
     * 
     * @param {string} prompt The user prompt.
     * @param {object} data The data to insert into instructions.
     * 
     * @returns {Promise<string>}
    */
    async toString(prompt, data) {
        return JSON.stringify({
            prompt: prompt,
            queryResult: JSON.parse(data.content),
            instruction: 'Realize a analise dos dados e responda a pergunta do usuario.'
        });
    }

}

module.exports = AssistantQueryDataInstructions;