# 📦 Changelog - BusOn

## [1.1.0] - 27-05-2025

### ✨ Novas funcionalidades
- Adicionada **interface fluente** para as entidades `Curso` e `Instituição` nos serviços de listagem.
- Implementada estrutura de **validação centralizada com Yup**, com **validators específicos** para todos os serviços.
- Implementado **Swagger** com `swagger-jsdoc`, documentando todos os controllers da aplicação.


### ✅ Testes e Integração Contínua
- Adicionados **testes unitários abrangentes** para controllers e services.
- Configuradas **GitHub Actions** para execução automática dos testes em cada push ou pull request na branch `main`.

### 🧼 Refatorações
- Aplicado o **princípio da responsabilidade única** nos controllers:
  - Separação clara entre **controller**, **service** e **validator** nas seguintes camadas:
    - `UsuarioController`
    - `AutenticacaoController`
    - `TemplateDocumentosController`
    - `AssociacaoController`
    - `PagamentoController`
    - `ParametroController`
    - `InstituicaoController`
    - `CursoController`
- Reorganização da estrutura do projeto para **adoção do padrão ECMAScript Modules** (`type: module`), substituindo o uso anterior do CommonJS.
- Padronização de nomenclaturas e organização de pastas.
- Substituição de estruturas `switch` extensas por **lógicas mais simples e legíveis**.
- Implementados **tratamentos de erro padronizados**, com respostas mais informativas, incluindo códigos de erro e mensagens descritivas sobre o problema ocorrido.

### 🔧 Infraestrutura
- Criado um ambiente de desenvolvimento completo com **Docker Compose**.
- Refatoração dos arquivos `docker-compose.yml` e `docker-compose-db.yml` para maior simplicidade e estabilidade.

### 🧹 Melhorias Gerais
- Aplicadas **padronizações de estilo de código** com **ESLint** e **Prettier**.
- Remoção de **comentários obsoletos ou desnecessários** no código.
- Substituição de **valores literais mágicos** por **constantes semânticas**, como `'PAGO'`, `'ADMIN'`, `1`, etc.
- Correções diversas em controllers, services, models e validators visando legibilidade e consistência.

### 🗑️ Remoções
- Removido o **módulo de IA/chatbot**, incluindo todos os arquivos e referências relacionados.
