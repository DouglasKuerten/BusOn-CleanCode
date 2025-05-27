/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário
 *         senha:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *       required:
 *         - email
 *         - senha
 *
 *     RefreshTokenRequest:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Token de atualização para renovar o access token
 *       required:
 *         - refreshToken
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário
 *         telefone:
 *           type: string
 *           description: Telefone do usuário
 *         endereco:
 *           type: string
 *           description: Endereço do usuário
 *         cursoId:
 *           type: integer
 *           description: ID do curso do usuário
 *         cursoNome:
 *           type: string
 *           description: Nome do curso do usuário
 *         instituicaoNome:
 *           type: string
 *           description: Nome da instituição do usuário
 *         associacaoId:
 *           type: integer
 *           description: ID da associação do usuário
 *         associacaoSigla:
 *           type: string
 *           description: Sigla da associação do usuário
 *         dataEntradaAssociacao:
 *           type: string
 *           format: date-time
 *           description: Data de entrada na associação
 *         tipoAcesso:
 *           type: string
 *           description: Tipo de acesso do usuário
 *         situacao:
 *           type: string
 *           description: Situação do usuário
 *         accessToken:
 *           type: string
 *           description: Token de acesso JWT
 *         refreshToken:
 *           type: string
 *           description: Token de atualização para renovar o access token
 *         exigirRedefinicaoSenha:
 *           type: boolean
 *           description: Indica se o usuário precisa redefinir a senha
 *         fotoUrl:
 *           type: string
 *           description: URL da foto do usuário
 *
 *     TokenResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           description: Novo token de acesso JWT
 *         refreshToken:
 *           type: string
 *           description: Token de atualização atual
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "usuario@exemplo.com"
 *             senha: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * /auth/refresh-token:
 *   post:
 *     tags: [Autenticação]
 *     summary: Renova o token de acesso usando o refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *           example:
 *             refreshToken: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"
 *     responses:
 *       200:
 *         description: Token renovado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Refresh token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 *
 * /auth/validate:
 *   get:
 *     tags: [Autenticação]
 *     summary: Valida o token atual e retorna os dados do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido, dados do usuário retornados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 *
 * /auth/logout:
 *   post:
 *     tags: [Autenticação]
 *     summary: Realiza o logout do usuário
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully!"
 *       401:
 *         description: Token inválido ou expirado
 *       403:
 *         description: Token não fornecido
 *       404:
 *         description: Refresh token não encontrado
 *       500:
 *         description: Erro interno do servidor
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
