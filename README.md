<div align="center">
  <img src="https://github.com/BrunoDimon/BusOnApp/blob/main/assets/busOnFonteBranca.png" alt="BusOn Logo" style='height: 280px;'/>  <hr>
  <h1>
    <br>
      <p>Projeto Intermediário — Clean Code - Engenharia de Software - UNISATC</p>
  </h1>
</div>

# Refatoração

Durante o processo de refatoração do projeto, identificamos diversos pontos de melhoria com base nos princípios de **Clean Code**. As alterações focaram na legibilidade, modularização, eliminação de duplicações e na implementação de testes automatizados.

👉 Para uma explicação completa das refatorações aplicadas, _code smells_ encontrados, estratégia adotada e o changelog com as mudanças acesse:

[📚 README de Refatoração](./README.REFATORACAO.md)

[📘 CHANGELOG](./CHANGELOG.md)

---

# Sobre o Projeto

## 🚌 O que é o BusOn?

O **BusOn** é uma solução digital desenvolvida para modernizar o gerenciamento de pagamentos mensais dos acadêmicos que utilizam o serviço de transporte universitário. O projeto surgiu da necessidade de substituir processos manuais, como controle por planilhas e preenchimento de documentos, trazendo mais agilidade, precisão e facilidade tanto para os alunos quanto para a gestão da associação.

Atualmente, o sistema é utilizado pela **Associação de Transporte Universitário de São Ludgero (UNISL)** e mantido pelos autores do projeto.

## 🔧 Problemas que solucionamos:

- Controle manual por meio de uma planilha de controle;
- Preenchimento de documentos de forma manual;

---

## Objetivos:

- Facilitar a cobrança/conferência/consulta de pagamentos dos acadêmicos;
- Facilitar emissão de documentos para os acadêmicos em nome da associação;
- Gerenciamento dos dias de utilização do transporte por cada universitário e manter seus dados atualizados;
- Gerenciamento de todas informações de alunos da associação;
- Contato assertivo com cada acadêmico;

---

## 🎡 Funcionalidades Principais

- ✅ Controle e conferência de pagamentos dos acadêmicos
- ✅ Emissão automatizada de documentos em nome da associação
- ✅ Gerenciamento dos dias de uso do transporte
- ✅ Cadastro e atualização dos dados dos acadêmicos
- ✅ Centralização das informações da associação

---

# Inicialização do Projeto

- ## Manualmente

  #### Clonar o projeto:

  ```bash
    git clone https://github.com/DouglasKuerten/BusOn-CleanCode.git
  ```

  #### Navegar até a pasta do projeto

  #### Instalar as dependências:

  ```bash
    npm i
  ```

  #### Iniciar o servidor

  ```bash
    npm start
  ```

  Necessário ter o postgres instalado na maquina e criar o banco manualmente dentro da IDE do PG Admin e colocar o respectivo nome nas variáveis de ambiente (dotenv)

- ## Docker

  #### Banco de Dados + Postgres:

  ```bash
    npm run docker
  ```

  > Comando irá executar tudo oque for necessário tanto do banco de dados quanto o backend e configurar, com variáveis de ambientes pré-definidas e ao fim inicializar em segundo plano;

  #### Banco de Dados:

  ```bash
    npm run docker:db
  ```

  > Comando irá executar tudo oque for necessário para inicializar o banco de dados com variáveis de ambientes pré-definidas e ao fim inicializar em segundo plano;

  #### Back-End:

  ```bash
    npm run docker:backend
  ```

  > Comando irá executar tudo oque for necessário para inicializar o back-end com variáveis de ambientes pré-definidas e ao fim inicializar em segundo plano;

> As variáveis de ambiente podem ser alteradas no arquivo do docker-compose ou criado um arquivo .env para utilizar no docker

---

# Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu arquivo .env

> O arquivo [.env.example](https://github.com/BrunoDimon/BusOn/blob/main/.env.example) foi deixado no projeto para usar de modelo

---

### Variáveis do banco de dados

##### **Configurações para conexção com o banco de dados**

`POSTGRES_HOST` (Endereço do banco de dados. Ex: "localhost")

`POSTGRES_DB` -> (Nome do banco de dados. Ex: "buson")

`POSTGRES_USER` -> (Usuário para conexão com banco de dados. Ex: "postgres")

`POSTGRES_PASSWORD` -> (Senha para conexão com banco de dados. Ex: "1234")

`PG_DIALECT` -> (Módulo do node que irá gerenciar o banco. Ex: "postgres)"

###### **Caso estiver utilizando o docker para rodar, deverá configurar as seguintes váriaveis também**

`POSTGRES_PORT` -> (Porta que irá rodar o postgres. Ex (Padrão): "5432")

`DATABASE_URL` -> (Url do database.)
Ex:

```
postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB)
```

---

### Variáveis do servidor

##### **Define em qual porta irá rodar o servidor.**

`SERVER_PORT` (Normalmente o node roda na porta 3000. Ex: 3000)

---

### Variáveis da autenticação

##### **Chave Secreta utilizada na autenticação.**

`JWT_SECRET` -> (Gerar uma chave aleatória. Ex:"cHavEgErAdA1234")

Comando:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

##### **Variáveis definem o tempo para expirar o token de acesso.**

`JWT_EXPIRATION` -> (Definir valor em segundos. Ex: 86400)

`JWT_REFRESH_EXPIRATION` -> (Definir valor em segundos. Ex: 86400)

---

# Tecnologias utilizadas

### Tecnologias usadas para a execução em produção

[![JavaScript][JavaScript.js]][JavaScript-url]
[![NodeJS][NodeJS.js]][NodeJS-url]
[![Express][Express.js]][Express-url]
[![Sequelize][Sequelize]][Sequelize-url]

[![PostgreSQL][PostgreSQL.js]][PostgreSQL-url]
[![Docker][Docker.js]][Docker-url]

# Autores

- **Bruno Dimon** - [https://github.com/BrunoDimon](https://github.com/BrunoDimon)
- **Douglas Kuerten** - [https://github.com/DouglasKuerten](https://github.com/DouglasKuerten)

---

# Repositórios Relacionados

#### - [Buson Front-End App (Mobile)](https://github.com/BrunoDimon/BusOnApp)

#### - [Buson Back-End Original](https://github.com/BrunoDimon/BusOn)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[ReactNative.js]: https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[ReactNative-url]: https://reactnative.dev/
[Expo.js]: https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
[Insomnia.js]: https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white
[Insomnia-url]: https://insomnia.rest/download
[Docker.js]: https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge
[Docker-url]: https://www.docker.com/products/docker-desktop/
[PostgreSQL.js]: https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql
[PostgreSQL-url]: https://www.postgresql.org/download/
[NodeJS.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/download/package-manager/current
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/pt-br/
[ChatGPT]: https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white
[ChatGPT-url]: https://platform.openai.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
