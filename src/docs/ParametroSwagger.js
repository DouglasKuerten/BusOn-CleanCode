/**
 * @swagger
 * components:
 *   schemas:
 *     Parametro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do parâmetro
 *         associacaoId:
 *           type: integer
 *           description: ID da associação à qual os parâmetros pertencem
 *         valor1:
 *           type: number
 *           format: double
 *           description: Valor para 1 dia de uso do transporte
 *         valor2:
 *           type: number
 *           format: double
 *           description: Valor para 2 dias de uso do transporte
 *         valor3:
 *           type: number
 *           format: double
 *           description: Valor para 3 dias de uso do transporte
 *         valor4:
 *           type: number
 *           format: double
 *           description: Valor para 4 dias de uso do transporte
 *         valor5:
 *           type: number
 *           format: double
 *           description: Valor para 5 dias de uso do transporte
 *         valor6:
 *           type: number
 *           format: double
 *           description: Valor para 6 dias de uso do transporte
 *         valorMulta:
 *           type: number
 *           format: double
 *           description: Valor da multa por atraso
 *         diaVencimento:
 *           type: integer
 *           description: Dia do mês para vencimento dos pagamentos
 *           minimum: 1
 *           maximum: 31
 *         diasToleranciaMulta:
 *           type: integer
 *           description: Quantidade de dias de tolerância antes de aplicar multa
 *         liberaAlteracaoDadosPessoais:
 *           type: string
 *           enum: [LIBERADO, BLOQUEADO]
 *           description: Define se os usuários podem alterar seus dados pessoais
 *         gerarPagamentosAutomatico:
 *           type: string
 *           enum: [SIM, NAO]
 *           description: Define se os pagamentos serão gerados automaticamente
 *       required:
 *         - associacaoId
 *         - valor1
 *         - valor2
 *         - valor3
 *         - valor4
 *         - valor5
 *         - valor6
 *         - valorMulta
 *         - diaVencimento
 *         - diasToleranciaMulta
 *         - liberaAlteracaoDadosPessoais
 *         - gerarPagamentosAutomatico
 */

/**
 * @swagger
 * /parametro/{id}:
 *   get:
 *     tags: [Parâmetro]
 *     summary: Obtém os parâmetros pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do parâmetro
 *     responses:
 *       200:
 *         description: Parâmetros encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parametro'
 *       404:
 *         description: Parâmetros não encontrados
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags: [Parâmetro]
 *     summary: Atualiza os parâmetros existentes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do parâmetro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parametro'
 *           example:
 *             associacaoId: 1
 *             valor1: 50.00
 *             valor2: 100.00
 *             valor3: 150.00
 *             valor4: 200.00
 *             valor5: 250.00
 *             valor6: 300.00
 *             valorMulta: 10.00
 *             diaVencimento: 10
 *             diasToleranciaMulta: 5
 *             liberaAlteracaoDadosPessoais: "LIBERADO"
 *             gerarPagamentosAutomatico: "SIM"
 *     responses:
 *       200:
 *         description: Parâmetros atualizados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parametro'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Parâmetros não encontrados
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags: [Parâmetro]
 *     summary: Remove os parâmetros
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do parâmetro
 *     responses:
 *       204:
 *         description: Parâmetros removidos com sucesso
 *       404:
 *         description: Parâmetros não encontrados
 *       500:
 *         description: Erro interno do servidor
 *
 * /parametro:
 *   get:
 *     tags: [Parâmetro]
 *     summary: Lista todos os parâmetros
 *     responses:
 *       200:
 *         description: Lista de parâmetros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parametro'
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     tags: [Parâmetro]
 *     summary: Cria novos parâmetros
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Parametro'
 *           example:
 *             associacaoId: 1
 *             valor1: 50.00
 *             valor2: 100.00
 *             valor3: 150.00
 *             valor4: 200.00
 *             valor5: 250.00
 *             valor6: 300.00
 *             valorMulta: 10.00
 *             diaVencimento: 10
 *             diasToleranciaMulta: 5
 *             liberaAlteracaoDadosPessoais: "LIBERADO"
 *             gerarPagamentosAutomatico: "SIM"
 *     responses:
 *       201:
 *         description: Parâmetros criados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parametro'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *
 * /parametro/associacao/{associacaoId}:
 *   get:
 *     tags: [Parâmetro]
 *     summary: Obtém os parâmetros de uma associação específica
 *     parameters:
 *       - in: path
 *         name: associacaoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da associação
 *     responses:
 *       200:
 *         description: Parâmetros da associação encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parametro'
 *       404:
 *         description: Parâmetros da associação não encontrados
 *       500:
 *         description: Erro interno do servidor
 */ 