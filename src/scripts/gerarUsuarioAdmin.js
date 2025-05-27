import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';

export const gerarUsuarioAdmin = async () => {
    const existingAdmin = await Usuario.findOne({ tipoAcesso: 'ACESSO_ADMIN' });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin', 15);
        const adminUser = await Usuario.create({
            nome: 'Admin',
            email: 'admin@admin.com',
            telefone: '00000000000',
            cidade: null,
            matricula: null,
            cpf: null,
            cursoId: null,
            associacaoId: null,
            tipoAcesso: 'ADMIN',
            cargo: null,
            senha: hashedPassword,
            situacao: 'ATIVO',
            diasUsoTransporte: [],
            exigirRedefinicaoSenha: true
        });
        console.log('Usuário admin gerado com sucesso!');
    } else {
        console.log('Usuário admin já existe, não foi gerado nenhum outro!');
    }
}