/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do curso
 *         nome:
 *           type: string
 *           description: Nome do curso
 *           minLength: 2
 *           maxLength: 255
 *         situacao:
 *           type: string
 *           enum: [ATIVO, INATIVO]
 *           description: Situação do curso
 *         instituicaoId:
 *           type: integer
 *           description: ID da instituição à qual o curso pertence
 *       required:
 *         - nome
 *         - situacao
 *         - instituicaoId
 */

/**
 * @swagger
 * /curso/{id}:
 *   get:
 *     tags: [Curso]
 *     summary: Obtém um curso pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Curso encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags: [Curso]
 *     summary: Atualiza um curso existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 255
 *                 description: Nome do curso
 *               situacao:
 *                 type: string
 *                 enum: [ATIVO, INATIVO]
 *                 description: Situação do curso
 *               instituicaoId:
 *                 type: integer
 *                 description: ID da instituição à qual o curso pertence
 *             required:
 *               - nome
 *               - situacao
 *               - instituicaoId
 *             example:
 *               nome: "Engenharia de Software"
 *               situacao: "ATIVO"
 *               instituicaoId: 1
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Dados inválidos ou instituição não encontrada
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags: [Curso]
 *     summary: Remove um curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do curso
 *     responses:
 *       204:
 *         description: Curso removido com sucesso
 *       404:
 *         description: Curso não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /curso:
 *   get:
 *     tags: [Curso]
 *     summary: Lista todos os cursos
 *     parameters:
 *       - in: query
 *         name: filters
 *         schema:
 *           type: string
 *         description: Filtros para a busca (JSON string)
 *         example: '{"situacao":"ATIVO"}'
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Ordenação dos resultados (JSON string)
 *         example: '[["nome","ASC"]]'
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Curso'
 *                   - type: object
 *                     properties:
 *                       instituicao:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           nome:
 *                             type: string
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     tags: [Curso]
 *     summary: Cria um novo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 255
 *                 description: Nome do curso
 *               situacao:
 *                 type: string
 *                 enum: [ATIVO, INATIVO]
 *                 description: Situação do curso
 *               instituicaoId:
 *                 type: integer
 *                 description: ID da instituição à qual o curso pertence
 *             required:
 *               - nome
 *               - situacao
 *               - instituicaoId
 *             example:
 *               nome: "Análise e Desenvolvimento de Sistemas"
 *               situacao: "ATIVO"
 *               instituicaoId: 1
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Dados inválidos ou instituição não encontrada
 *       500:
 *         description: Erro interno do servidor
 */ 