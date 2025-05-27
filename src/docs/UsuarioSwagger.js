/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário (será convertido para minúsculas)
 *         telefone:
 *           type: string
 *           description: Telefone do usuário (usado como senha padrão se senha não for fornecida)
 *         cidade:
 *           type: string
 *           description: Cidade do usuário
 *           nullable: true
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *           nullable: true
 *         matricula:
 *           type: string
 *           description: Matrícula do usuário
 *           nullable: true
 *         cursoId:
 *           type: integer
 *           description: ID do curso do usuário
 *           nullable: true
 *         associacaoId:
 *           type: integer
 *           description: ID da associação do usuário
 *           nullable: true
 *         dataEntradaAssociacao:
 *           type: string
 *           format: date-time
 *           description: Data de entrada na associação
 *           nullable: true
 *         tipoAcesso:
 *           type: string
 *           enum: [ADMIN, PRESIDENTE, DIRETOR, ASSOCIADO]
 *           description: Nível de acesso do usuário
 *         cargo:
 *           type: string
 *           description: Cargo do usuário
 *           nullable: true
 *         situacao:
 *           type: string
 *           enum: [ATIVO, INATIVO]
 *           description: Situação do usuário
 *         diasUsoTransporte:
 *           type: array
 *           items:
 *             type: string
 *             enum: [SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO]
 *           description: Dias da semana em que o usuário utiliza o transporte
 *         exigirRedefinicaoSenha:
 *           type: boolean
 *           description: Indica se o usuário precisa redefinir a senha no próximo login
 *         fotoUrl:
 *           type: string
 *           description: URL da foto do usuário
 *           nullable: true
 *         valorMensalidade:
 *           type: number
 *           format: double
 *           description: Valor da mensalidade calculado com base nos dias de uso
 *           readOnly: true
 *       required:
 *         - nome
 *         - email
 *         - telefone
 *         - tipoAcesso
 *         - situacao
 *
 *     AtualizarSenhaRequest:
 *       type: object
 *       properties:
 *         senhaAntiga:
 *           type: string
 *           format: password
 *           description: Senha atual do usuário
 *         senhaNova:
 *           type: string
 *           format: password
 *           description: Nova senha do usuário
 *       required:
 *         - senhaAntiga
 *         - senhaNova
 */

/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     tags: [Usuário]
 *     summary: Obtém um usuário pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   put:
 *     tags: [Usuário]
 *     summary: Atualiza um usuário existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: Dados do usuário em formato JSON string
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Foto do usuário
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário atualizado com sucesso"
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 *   delete:
 *     tags: [Usuário]
 *     summary: Remove um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /usuario:
 *   get:
 *     tags: [Usuário]
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
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
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro interno do servidor
 *
 *   post:
 *     tags: [Usuário]
 *     summary: Cria um novo usuário
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: Dados do usuário em formato JSON string
 *                 example: |
 *                   {
 *                     "nome": "João Silva",
 *                     "email": "joao@exemplo.com",
 *                     "telefone": "11999999999",
 *                     "tipoAcesso": "ASSOCIADO",
 *                     "situacao": "ATIVO",
 *                     "diasUsoTransporte": ["SEGUNDA", "QUARTA", "SEXTA"]
 *                   }
 *               foto:
 *                 type: string
 *                 format: binary
 *                 description: Foto do usuário
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 *
 * /usuario/{id}/senha:
 *   put:
 *     tags: [Usuário]
 *     summary: Atualiza a senha do usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarSenhaRequest'
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha atualizada com sucesso"
 *       401:
 *         description: Senha antiga incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /usuario/{id}/resetar-senha:
 *   post:
 *     tags: [Usuário]
 *     summary: Reseta a senha do usuário para o número do telefone
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Senha resetada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Senha redefinida com sucesso"
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /usuario/completo:
 *   get:
 *     tags: [Usuário]
 *     summary: Lista todos os usuários com informações completas incluindo valor da mensalidade
 *     security:
 *       - bearerAuth: []
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
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Usuario'
 *                   - type: object
 *                     properties:
 *                       associacao:
 *                         type: object
 *                         properties:
 *                           parametro:
 *                             type: object
 *                             properties:
 *                               valor1:
 *                                 type: number
 *                               valor2:
 *                                 type: number
 *                               valor3:
 *                                 type: number
 *                               valor4:
 *                                 type: number
 *                               valor5:
 *                                 type: number
 *                               valor6:
 *                                 type: number
 *       500:
 *         description: Erro interno do servidor
 */
