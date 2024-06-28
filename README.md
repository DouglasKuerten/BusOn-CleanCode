<div align="center">
  <img src="https://github.com/BrunoDimon/BusOnApp/blob/main/assets/busOnFonteBranca.png" alt="BusOn Logo" style='height: 280px;'/>  <hr>
  <h1>
    <br>
      <p>Back-End Buson - Projeto Integrador IA - Engenharia de Software - UNISATC</p>
  </h1>
</div>

# Sobre o Projeto
## Oque é:
- O Aplicativo foi desenvolvido com o intuito de facilitar o gerenciamento dos pagamentos mensais dos acadêmicos que utilizam o serviço de transporte para deslocamento até as universidades. Além disso, o aplicativo fornece informações detalhadas sobre a associação e, situação dos acadêmicos e seus pagamentos, por meio de um chat com inteligência artificial.

## Oque procuramos resolver:
- Controle manual por meio de uma planilha de controle;
- Preenchimento de documentos de forma manual;
  
## Objetivos:
- Facilitar a cobrança/conferência/consulta de pagamentos dos acadêmicos;
- Facilitar emissão de documentos para os acadêmicos em nome da associação;
- Gerenciamento dos dias de utilização do transporte por cada universitário e manter seus dados atualizados;
- Gerenciamento de todas informações de alunos da associação;
- Contato assertivo com cada acadêmico;

---

# Inicialização do Projeto
### Clonar o projeto:
```bash
  git clone https://github.com/BrunoDimon/BusOn.git
```
### Navegar até a pasta do projeto

#### Instalar as dependências:
```bash
  npm i 
```

#### Iniciar o servidor
Tem duas opções para inicializar o servidor que irão funcionar normalmente:
##### 1 - Manualmente:
```bash
  npm start 
```
> Necessário ter o postgres instalado na maquina e criar o banco manualmente dentro da IDE do PG Admin e colocar o respectivo nome nas variáveis de ambiente (dotenv)

##### 2 - Com Docker:
```bash
  npm run docker
```
> Necessário somente ter o docker instalado, o comando irá executar tudo oque for necessário e configurar, apenas deverá passar a conexão nas variáveis de ambiente (dotenv)


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

`SERVER_PORT`  (Normalmente o node roda na porta 3000. Ex: 3000)

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

### **Variáveis da IA**
`OPENAI_API_KEY` -> (Chave usada para acesso a API do OpenAI)

Clique [aqui](https://github.com/BrunoDimon/BusOn/blob/main/DetalhamentoIA.md) para vizualizar mais detalhes sobre a implemetação da IA dentro desse projeto

---

# Tecnologias utilizadas
### Tecnologias usadas para a execução em produção
[![JavaScript][JavaScript.js]][JavaScript-url]
[![NodeJS][NodeJS.js]][NodeJS-url]
[![Express][Express.js]][Express-url]
[![Sequelize][Sequelize]][Sequelize-url]

[![PostgreSQL][PostgreSQL.js]][PostgreSQL-url]
[![ChatGPT][ChatGPT]][ChatGPT-url]
[![Docker][Docker.js]][Docker-url]

### Tecnologias usadas em desenvolvimento apenas
[![Insomnia][Insomnia.js]][Insomnia-url]

# Autores

* **Bruno Dimon** - [https://github.com/BrunoDimon](https://github.com/BrunoDimon)
* **Douglas Kuerten** - [https://github.com/DouglasKuerten](https://github.com/DouglasKuerten)
* **Lucas Zanoni** - [https://github.com/Castrozan](https://github.com/Castrozan)
* **Thiago Dimon** - [https://github.com/thiagoDimon](https://github.com/thiagoDimon)
* **Vinicius Milanez** - [https://github.com/viniciusmilanez](https://github.com/viniciusmilanez)
  
---

# Repositórios Relacionados

 #### - [Buson Front-End App (Mobile)](https://github.com/BrunoDimon/BusOnApp)
 #### - [Buson Back-End](https://github.com/BrunoDimon/BusOn)


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
