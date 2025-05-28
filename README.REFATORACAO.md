# 📚 Refatoração do Projeto

Este documento detalha as melhorias aplicadas ao projeto **BusOn** com foco em qualidade de código, legibilidade, testabilidade e organização geral. A versão refatorada está disponível neste repositório:

🔗 [`BusOn-CleanCode`](https://github.com/DouglasKuerten/BusOn-CleanCode)

---

## 🤍 Interface Fluente (Query Builder)

Foi implementado um **Query Builder** para as entidades de **Instituição** e **Curso**, permitindo a construção fluente e legível de queries, facilitando a manutenção e extensibilidade.

---

## ✅ Testes Automatizados

A aplicação agora possui **testes unitários com Jest**, cobrindo os principais serviços e controladores. Foram testados cenários de sucesso e falha, contribuindo para a robustez do sistema.

📁 Exemplo:

- [`src/__tests__`](https://github.com/DouglasKuerten/BusOn-CleanCode/tree/main/src/__tests__)

---

## 🚨 Code Smells Identificados e Corrigidos

Durante a refatoração, foram encontrados diversos _code smells_ que comprometiam a qualidade da aplicação. A seguir, estão listados os principais com exemplos antes/depois:

### 🧱 Large Classes (Classes Grandes)

Classes como Controller e Service concentravam muitas responsabilidades.

- 🔴 Antes:  
  [`pagamentoController.js`](https://github.com/BrunoDimon/BusOn/blob/main/src/controllers/pagamentoController.js)

- ✅ Depois:  
  [`PagamentoController.js`](https://github.com/DouglasKuerten/BusOn-CleanCode/blob/main/src/controllers/PagamentoController.js)  
  [`PagamentoService.js`](https://github.com/DouglasKuerten/BusOn-CleanCode/blob/main/src/services/PagamentoService.js)  
  [`PagamentoSchema.js`](https://github.com/DouglasKuerten/BusOn-CleanCode/blob/main/src/validators/PagamentoSchema.js)

---

### 🔧 Long Methods (Métodos Longos)

Métodos extensos dificultavam compreensão e testes.

- 🔴 Antes:  
  [`verificarPagamentosAtrasados.js`](https://github.com/BrunoDimon/BusOn/blob/main/src/jobs/scripts/verificarPagamentosAtrasados.js)

- ✅ Depois:  
  [`verificarPagamentosAtrasados.js`](https://github.com/DouglasKuerten/BusOn-CleanCode/blob/main/src/jobs/scripts/verificarPagamentosAtrasados.js)

---

### 🚦 Magic Numbers e Strings

Valores fixos estavam espalhados no código, dificultando mudanças.

- 🔴 Antes:  
  [`gerarUsuarioAdmin.js`](https://github.com/BrunoDimon/BusOn/blob/main/src/scripts/gerarUsuarioAdmin.js)

- ✅ Depois:  
  [`gerarUsuarioAdmin.js`](https://github.com/DouglasKuerten/BusOn-CleanCode/blob/main/src/scripts/gerarUsuarioAdmin.js)

---

### 🔁 Switch Statements (Switch Grande)

Uso excessivo de `switch` para cálculos.

- 🔴 Antes:  
  [`gerarPagamento.js`](https://github.com/BrunoDimon/BusOn/blob/main/src/jobs/scripts/gerarPagamento.js)

- ✅ Depois:  
  Refatorado para uso de objeto dinâmico:

---

### ⚰️ Dead Code (Código Morto)

- Código não utilizado, funções ou variáveis obsoletas foram removidos para evitar confusão e manter o código limpo.
- 🔴 Removidos códigos que não eram mais utilziados:

  [`providers`](https://github.com/BrunoDimon/BusOn/tree/main/src/providers)

  [`services`](https://github.com/BrunoDimon/BusOn/tree/main/src/services)

  [`entitys`](https://github.com/BrunoDimon/BusOn/tree/main/src/entity)

  [`adapters`](https://github.com/BrunoDimon/BusOn/tree/main/src/adapters)

---

### 🧭 Má Nomenclatura

- Variáveis e funções usavam nomes genéricos ou pouco descritivos, foram revisados para representar com clareza sua responsabilidade.

---

### 📝 Comments (Comentários Excessivos)

- Comentários que tentavam explicar código confuso foram eliminados ao melhorar a clareza do código.

---
