/**
 * @swagger
 * components:
 *   schemas:
 *     Pagamento:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do pagamento
 *         txId:
 *           type: string
 *           description: ID da transação PIX
 *           nullable: true
 *         pixCopiaCola:
 *           type: string
 *           description: Código PIX copia e cola
 *           nullable: true
 *         usuarioId:
 *           type: integer
 *           description: ID do usuário associado ao pagamento
 *         tipo:
 *           type: string
 *           enum: [PIX]
 *           description: Tipo de pagamento
 *         valor:
 *           type: number
 *           format: double
 *           description: Valor do pagamento
 *         multa:
 *           type: number
 *           format: double
 *           description: Valor da multa (se houver)
 *           nullable: true
 *         dataVencimento:
 *           type: string
 *           format: date-time
 *           description: Data de vencimento do pagamento
 *           nullable: true
 *         dataPagamento:
 *           type: string
 *           format: date-time
 *           description: Data em que o pagamento foi efetuado
 *           nullable: true
 *         situacao:
 *           type: string
 *           enum: [ABERTO, PAGO, ATRASADO, CANCELADO]
 *           description: Situação atual do pagamento
 *         valorTotal:
 *           type: number
 *           format: double
 *           description: Valor total incluindo multa (calculado automaticamente)
 *           readOnly: true
 *       required:
 *         - usuarioId
 *         - tipo
 *         - valor
 *         - situacao
 */

/**
 * @swagger
 * /pagamento/{id}:
 *   get:
 *     tags: [Pagamento]
 *     summary: Obtém um pagamento pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pagamento
 *     responses:
 *       200:
 *         description: Pagamento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       404:
 *         description: Pagamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags: [Pagamento]
 *     summary: Atualiza um pagamento existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pagamento'
 *           example:
 *             usuarioId: 1
 *             tipo: "PIX"
 *             valor: 150.00
 *             multa: 15.00
 *             dataVencimento: "2024-04-10T00:00:00Z"
 *             situacao: "ABERTO"
 *     responses:
 *       200:
 *         description: Pagamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Pagamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags: [Pagamento]
 *     summary: Remove um pagamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pagamento
 *     responses:
 *       204:
 *         description: Pagamento removido com sucesso
 *       404:
 *         description: Pagamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /pagamento:
 *   get:
 *     tags: [Pagamento]
 *     summary: Lista todos os pagamentos
 *     parameters:
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *         description: Filtros para a busca (JSON string)
 *         example: '{"situacao":"ABERTO"}'
 *       - in: query
 *         name: filtersAssociacao
 *         schema:
 *           type: string
 *         description: Filtros para a associação relacionada (JSON string)
 *         example: '{"id":1}'
 *     responses:
 *       200:
 *         description: Lista de pagamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Pagamento'
 *                   - type: object
 *                     properties:
 *                       usuario:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           nome:
 *                             type: string
 *                           diasUsoTransporte:
 *                             type: array
 *                             items:
 *                               type: string
 *                           fotoUrl:
 *                             type: string
 *                           associacao:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               sigla:
 *                                 type: string
 *                           curso:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               nome:
 *                                 type: string
 *                               instituicao:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                   nome:
 *                                     type: string
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     tags: [Pagamento]
 *     summary: Cria um novo pagamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pagamento'
 *           example:
 *             usuarioId: 1
 *             tipo: "PIX"
 *             valor: 150.00
 *             dataVencimento: "2024-04-10T00:00:00Z"
 *             situacao: "ABERTO"
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pagamento'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *
 * /pagamento/{id}/aprovar:
 *   post:
 *     tags: [Pagamento]
 *     summary: Aprova um pagamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pagamento
 *     responses:
 *       204:
 *         description: Pagamento aprovado com sucesso
 *       404:
 *         description: Pagamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /pagamento/{id}/reprovar:
 *   post:
 *     tags: [Pagamento]
 *     summary: Reprova um pagamento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pagamento
 *     responses:
 *       204:
 *         description: Pagamento reprovado com sucesso
 *       404:
 *         description: Pagamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /pagamento/gerar-mensais/{associacaoId}:
 *   post:
 *     tags: [Pagamento]
 *     summary: Gera pagamentos mensais para todos os usuários ativos de uma associação
 *     parameters:
 *       - in: path
 *         name: associacaoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da associação
 *     responses:
 *       204:
 *         description: Pagamentos mensais gerados com sucesso
 *       404:
 *         description: Parâmetros de pagamento não encontrados para a associação
 *       500:
 *         description: Erro interno do servidor
 */
