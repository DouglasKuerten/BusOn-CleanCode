# Integração OpenAI

## Como funciona?

- A integração com o ChatGPT é utilizada para análise de dados da aplicação em geral. Como se ele entendesse todo o contexto momentâneo da aplicação e respondesse ao usuário sem que este precise analisar o estado da aplicação navegando por inúmeras páginas. 
- Somente em contato com o chatbot, é possível identificar e obter as principais informações que geram valor para o gerenciador do sistema de controle do ônibus.

Algumas principais perguntas para a IA podem ser:

- Quais pessoas ainda não pagaram o ônibus este mês?
- Quantas pessoas vão de ônibus na terça-feira?
- Quais cursos temos cadastrados na aplicação?
- Qual é o e-mail para contato do Bruno Dimon?

Além dessas perguntas relacionadas ao negócio, o assistente pode responder a perguntas sobre questões gerais.

### Fluxo de saída antecipada

O fluxo de saída antecipada ocorre quando a pergunta do usuário não exige consulta aos dados da aplicação para resposta. Esse caso pode acontecer porque a pergunta feita é genérica ou dados da aplicação foram recuperados anteriormente e não necessitam ser consultados novamente.

### Fluxo de consulta aos dados da aplicação

Este é o fluxo tradicional que permite que o assistente tenha as informações da aplicação e realize a análise dos dados.

Existem 3 principais etapas neste fluxo:

#### 1. Definição de contexto e instruções

- Instruções são definidas para definir como a IA deve abordar a pergunta e como ela deve responder em determinadas situações. Segue abaixo um exemplo de instrução enviada para a IA neste momento.
    - Exemplo:
        ```javascript
            /**
             * Method to get instructions
            * 
            * @returns {Promise<string>}
            */
            async _getInstructions() {
                return `
                    Você deve criar uma query para consultar os models da aplicação e conseguir os dados para responder a pergunta usando sequelize. 
                    Gere a query e envie no campo "jsonQueryString".

                    Uma nova mensagem será enviada com os dados do model escolhido.

                    Caso não seja possível responder a pergunta somente com os dados do model, 
                    "earlyReturn" deve ser true e "status" deve ser 204 e a sua mensagem deve ser enviada no campo "message".

                    Caso não seja necessário realizar consultas no banco de dados, responda normalmente utilizando somente plain text com o modelo: 
                    "earlyReturn" deve ser true e "status" deve ser 200 e a sua resposta deve ser enviada no campo "message".
                `;
            }
        ```
- Nesse momento os dados da aplicação também são enviados para a IA.
    - Exemplo:
        ```javascript
            /**
             * Method to get application data structure
             * 
             * @returns {Promise<string>}
            */
            async _getApplicationDataStructure() {
                const dataStructure = {
                    usuarios: await Usuario.describe(),
                    pagamentos: await Pagamento.describe(),
                    instituicoes: await Instituicao.describe(),
                    cursos: await Curso.describe(),
                    associacaos: await Associacao.describe(),
                }

                return `
                    Relação de tabelas da aplicação,
                    ${JSON.stringify(dataStructure)}
                `;
            }
        ```
- Definimos um formato de comunicação com a IA para que seja possível ler a resposta do assistente
    - Exemplo:
        ```javascript
            /**
             * Method to get response format
             * 
             * @returns {Promise<string>}
            */
            async _getResponseFormat() {
                return `
                    As suas respostas devem sempre estar no formato json abaixo. O json deve ser serializado para string antes de ser enviado.
                    Retorne somente texto simples.
                    Exemplo:
                    {
                        "earlyReturn": false,
                        "status": 200,
                        "data": {
                            "jsonQueryString": {
                                "model": "usuarios",
                                "method": "findAll",
                                "attributes": ["id", "nome", "tipoAcesso", "situacao", "diasUsoTransporte"],
                                "where": { "id": 1, "nome": "Jhon" },
                                "order": [["id", "DESC"], ["nome", "ASC"]],
                                "include": [
                                    {
                                        "model": "associacao",
                                        "attributes": ["id", "nome"]
                                    },
                                    {
                                        "model": "curso",
                                        "attributes": ["id", "nome"],
                                        "include": [
                                            {
                                                "model": "instituicao",
                                                "attributes": ["id", "nome"]
                                            }
                                        ]
                                    }
                                ]
                            },
                            "message": null
                        }
                    }
                `;
            }
        ```

#### 2. Envio e tratamento do retorno

- Ao enviar o conjunto destas instruções, caso o assistente retorne conforme esperado, é possível parsear a informação e então buscar os dados da aplicação no banco de dados.
- Com a busca realizada no banco de dados, uma nova requisição é feita para o assistente e uma nova string com novas instruções e os dados da aplicação são enviados.

#### 3. Recuperação da resposta final

- De acordo com as instruções da resposta final, caso o assistente retorne de forma esperada, é possível enviar para o cliente o resultado da análise dos dados respondendo a pergunta inicial.