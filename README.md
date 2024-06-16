<div align="center">
  <img src="https://github.com/BrunoDimon/BusOnApp/blob/main/assets/busOnFontePreta.png" alt="BusOn Logo" style='height: 280px;'/>
  <hr>
  <h1>
    <br>
      <p>Back - end  BusOn - Projeto Integrador Inteligencia Artificial <br> Engenharia de Software - UNISATC</p>
  </h1>
</div>

Este projeto consiste em um aplicativo desenvolvido para facilitar o gerenciamento dos pagamentos dos alunos que utilizam o serviço de transporte de São Ludgero para universidades. Através desta aplicação, é possível realizar e monitorar os pagamentos dos alunos de forma organizada e eficiente. O objetivo é proporcionar uma ferramenta que simplifique o controle financeiro e administrativo relacionado ao transporte univesitário.

## Introdução

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

## Telas do App

Abaixo o menu principal de cada usuario:

Tela Aluno
<div style text-align: right>
  <img src="https://github.com/BrunoDimon/BusOnApp/blob/main/assets/TelaAluno.jfif" alt="BusOn Logo" style='height: 600px;'/>
</div>

Tela Gestao
<div>
  <img src="https://github.com/BrunoDimon/BusOnApp/blob/main/assets/TelaGestao.jfif" alt="BusOn Logo" style='height: 600px;'/>
</div>


## Pré-requisitos

Para instalar a aplicação, primeiro precisa dos seguintes componentes instalados:

```
VisualStudioCode - https://code.visualstudio.com/
```
```
Git - https://www.git-scm.com/downloads
```
```
NodeJs - https://nodejs.org/en/download/package-manager/current
```
```
Docker - https://www.docker.com/products/docker-desktop/
```
```
Insomnia - https://insomnia.rest/download
```

### Instalação e execução

Para instalar o aplicativo, siga os seguintes passos:

1. Clone o repositório do aplicativo.
```sh
  git clone https://github.com/BrunoDimon/BusOnApp.git
```
2. Execute o comando para instalar as dependências do aplicativo.
```sh
  npm install
```

3. Execute o comando para configurar o docker.
```sh
  docker compose -f docker-compose.yml up -d
```
4. Execute o comando para iniciar a aplicação.
```sh
  npm start
```
5. Com aplicativo do Expo, scaneie o QR code gerado ou simule em um smartphone virtual via Android Studio


## Implantação

Adicione notas adicionais sobre como implantar isso em um sistema ativo

### Tecnologias utilizadas
[![Insomnia][Insomnia.js]][Insomnia-url]
[![Docker][Docker.js]][Docker-url]
[![PostgreSQL][PostgreSQL.js]][PostgreSQL-url]
[![NodeJS][NodeJS.js]][NodeJS-url]

## Autores

* **Lucas Zanoni* - *Desenvolvimento Back End* - [https://github.com/Castrozan](https://github.com/Castrozan)

## Referências

Cite aqui todas as referências utilizadas neste projeto, pode ser outros repositórios, livros, artigos de internet etc.


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
