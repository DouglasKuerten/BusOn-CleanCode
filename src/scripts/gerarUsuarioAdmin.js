import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import TipoAcessoEnum from '../enum/TIpoAcessoEnum.js';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

export const gerarUsuarioAdmin = async () => {
    const existingAdmin = await Usuario.findOne({
        where: {
            tipoAcesso: TipoAcessoEnum.ADMIN
        }
    });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin', 15);
        await Usuario.create({
            nome: 'Admin',
            email: 'admin@admin.com',
            telefone: '00000000000',
            cidade: null,
            matricula: null,
            cpf: null,
            cursoId: null,
            associacaoId: null,
            tipoAcesso: TipoAcessoEnum.ADMIN,
            cargo: null,
            senha: hashedPassword,
            situacao: AtivoInativoEnum.ATIVO,
            diasUsoTransporte: [],
            exigirRedefinicaoSenha: true
        });
        console.log('Usuário admin gerado com sucesso!');
    } else {
        console.log('Usuário admin já existe, não foi gerado nenhum outro!');
    }
}