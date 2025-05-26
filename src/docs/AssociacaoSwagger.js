/**
 * @swagger
 * components:
 *   schemas:
 *     Associacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da associação
 *         cnpj:
 *           type: string
 *           description: CNPJ da associação
 *         nome:
 *           type: string
 *           description: Nome da associação
 *         sigla:
 *           type: string
 *           description: Sigla da associação
 *         cidade:
 *           type: string
 *           description: Cidade da associação
 *         cep:
 *           type: string
 *           description: CEP da associação
 *         uf:
 *           type: string
 *           description: UF da associação
 *         bairro:
 *           type: string
 *           description: Bairro da associação
 *         endereco:
 *           type: string
 *           description: Endereço da associação
 *         situacao:
 *           type: string
 *           enum: [ATIVO, INATIVO]
 *           description: Situação da associação
 *         logoUrl:
 *           type: string
 *           description: URL da logo da associação
 *         logoDeclaracaoUrl:
 *           type: string
 *           description: URL da logo para declaração
 *       required:
 *         - nome
 *         - sigla
 *         - cidade
 *         - cep
 *         - uf
 *         - bairro
 *         - endereco
 *         - situacao
 */

/**
 * @swagger
 * /associacao/{id}:
 *   get:
 *     tags: [Associação]
 *     summary: Obtém uma associação pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da associação
 *     responses:
 *       200:
 *         description: Associação encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Associacao'
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags: [Associação]
 *     summary: Atualiza uma associação existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da associação
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: Dados da associação em formato JSON string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Nova logo da associação
 *               logoDeclaracao:
 *                 type: string
 *                 format: binary
 *                 description: Nova logo para declaração
 *     responses:
 *       200:
 *         description: Associação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Associacao'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags: [Associação]
 *     summary: Remove uma associação
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da associação
 *     responses:
 *       204:
 *         description: Associação removida com sucesso
 *       404:
 *         description: Associação não encontrada
 *       500:
 *         description: Erro interno do servidor
 *
 * /associacao:
 *   get:
 *     tags: [Associação]
 *     summary: Lista todas as associações
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
 *         description: Lista de associações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Associacao'
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     tags: [Associação]
 *     summary: Cria uma nova associação
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: Dados da associação em formato JSON string
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: Logo da associação
 *               logoDeclaracao:
 *                 type: string
 *                 format: binary
 *                 description: Logo para declaração
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Associacao'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
