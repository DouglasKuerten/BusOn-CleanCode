/**
 * @swagger
 * components:
 *   schemas:
 *     Instituicao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da instituição
 *         nome:
 *           type: string
 *           description: Nome da instituição
 *         endereco:
 *           type: string
 *           description: Endereço da instituição
 *         situacao:
 *           type: string
 *           enum: [ATIVO, INATIVO]
 *           description: Situação da instituição
 *         associacaoId:
 *           type: integer
 *           description: ID da associação à qual a instituição pertence
 *         logoUrl:
 *           type: string
 *           description: URL da logo da instituição
 *       required:
 *         - nome
 *         - endereco
 *         - situacao
 *         - associacaoId
 */

/**
 * @swagger
 * /instituicao/{id}:
 *   get:
 *     tags: [Instituição]
 *     summary: Obtém uma instituição pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da instituição
 *     responses:
 *       200:
 *         description: Instituição encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instituicao'
 *       404:
 *         description: Instituição não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags: [Instituição]
 *     summary: Atualiza uma instituição existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da instituição
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: Dados da instituição em formato JSON string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Nova logo da instituição
 *     responses:
 *       200:
 *         description: Instituição atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instituicao'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Instituição não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags: [Instituição]
 *     summary: Remove uma instituição
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da instituição
 *     responses:
 *       204:
 *         description: Instituição removida com sucesso
 *       404:
 *         description: Instituição não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 * /instituicao:
 *   get:
 *     tags: [Instituição]
 *     summary: Lista todas as instituições
 *     parameters:
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *         description: Filtros para a busca (JSON string)
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Ordenação dos resultados (JSON string)
 *     responses:
 *       200:
 *         description: Lista de instituições retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Instituicao'
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     tags: [Instituição]
 *     summary: Cria uma nova instituição
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: Dados da instituição em formato JSON string
 *                 required: true
 *                 example: |
 *                   {
 *                     "nome": "Nome da Instituição",
 *                     "endereco": "Endereço da Instituição",
 *                     "situacao": "ATIVO",
 *                     "associacaoId": 1
 *                   }
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo da instituição
 *     responses:
 *       201:
 *         description: Instituição criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Instituicao'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */ 