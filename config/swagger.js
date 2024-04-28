const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "BusOn API",
        description: "Documentação da API do APP BusOn Mobile"
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    examples: {
        Associacao: {
            id: 1,
            cpf_cnpj: 11122233344,
            descricao: "Descrição da associacao",
            endereco: "Endereço da associacao",
            pix_api_id: 123458,
            situacao: "ATIVO",
        }
    },
    components: {
        schemas: {
            Associacao: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    cpf_cnpj: { type: "integer", example: 11122233344 },
                    descricao: { type: "string", example: "Descrição da associacao" },
                    endereco: { type: "string", example: "Endereço da associacao" },
                    pix_api_id: { type: "integer", example: 123458 },
                    situacao: { type: "string", example: "ATIVO" },
                }
            }
        }
    }
};


const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('../server');
});