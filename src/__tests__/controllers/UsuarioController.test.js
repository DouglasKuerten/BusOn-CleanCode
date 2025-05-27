import { jest } from '@jest/globals';
import UsuarioController from '../../controllers/UsuarioController.js';
import UsuarioService from '../../services/UsuarioService.js';
import { StatusCodes } from 'http-status-codes';
import TipoAcessoEnum from '../../enum/TIpoAcessoEnum.js';
import AtivoInativoEnum from '../../enum/AtivoInativoEnum.js';

describe('UsuarioController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    const usuarioFake = {
        id: 1,
        nome: 'João Silva',
        email: 'joao@example.com',
        telefone: '11999999999',
        tipoAcesso: TipoAcessoEnum.ASSOCIADO,
        situacao: AtivoInativoEnum.ATIVO
    };

    test('obterUsuarioPorId retorna usuário quando encontrado', async () => {
        req.params.id = 1;

        jest.spyOn(UsuarioService, 'obterUsuarioPorId')
            .mockResolvedValue(usuarioFake);

        await UsuarioController.obterUsuarioPorId(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(usuarioFake);
        expect(next).not.toHaveBeenCalled();
    });

    test('obterTodosUsuarios retorna lista de usuários', async () => {
        const filters = { situacao: AtivoInativoEnum.ATIVO };
        const orderBy = [['nome', 'ASC']];
        req.query = {
            filters: JSON.stringify(filters),
            orderBy: JSON.stringify(orderBy)
        };

        jest.spyOn(UsuarioService, 'obterTodosUsuarios')
            .mockResolvedValue([usuarioFake]);

        await UsuarioController.obterTodosUsuarios(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith([usuarioFake]);
        expect(next).not.toHaveBeenCalled();
    });

    test('criarUsuario cria novo usuário com dados JSON', async () => {
        const novoUsuario = {
            nome: 'João Silva',
            email: 'joao@example.com',
            telefone: '11999999999',
            tipoAcesso: TipoAcessoEnum.ASSOCIADO,
            situacao: AtivoInativoEnum.ATIVO
        };

        req.body = novoUsuario;

        jest.spyOn(UsuarioService, 'criarUsuario')
            .mockResolvedValue({ id: 1, ...novoUsuario });

        await UsuarioController.criarUsuario(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1, ...novoUsuario }));
        expect(next).not.toHaveBeenCalled();
    });

    test('criarUsuario cria novo usuário com dados form-data', async () => {
        const novoUsuario = {
            nome: 'João Silva',
            email: 'joao@example.com',
            telefone: '11999999999',
            tipoAcesso: TipoAcessoEnum.ASSOCIADO,
            situacao: AtivoInativoEnum.ATIVO
        };

        req.body = { data: JSON.stringify(novoUsuario) };
        req.file = { filename: 'foto.jpg' };

        jest.spyOn(UsuarioService, 'criarUsuario')
            .mockResolvedValue({ id: 1, ...novoUsuario, fotoUrl: 'foto.jpg' });

        await UsuarioController.criarUsuario(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ id: 1, ...novoUsuario, fotoUrl: 'foto.jpg' })
        );
        expect(next).not.toHaveBeenCalled();
    });

    test('atualizarUsuario atualiza usuário existente', async () => {
        const dadosAtualizacao = {
            nome: 'João Silva Atualizado',
            email: 'joao.atualizado@example.com'
        };

        req.params.id = 1;
        req.body = { data: JSON.stringify(dadosAtualizacao) };
        req.file = { filename: 'nova_foto.jpg' };

        jest.spyOn(UsuarioService, 'atualizarUsuario')
            .mockResolvedValue({ message: 'Usuário atualizado com sucesso' });

        await UsuarioController.atualizarUsuario(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário atualizado com sucesso' });
        expect(next).not.toHaveBeenCalled();
    });

    test('atualizarSenhaUsuario atualiza senha', async () => {
        const senhas = {
            senhaAntiga: 'senha_antiga',
            senhaNova: 'senha_nova'
        };

        req.params.id = 1;
        req.body = senhas;

        jest.spyOn(UsuarioService, 'atualizarSenha')
            .mockResolvedValue({ message: 'Senha atualizada com sucesso' });

        await UsuarioController.atualizarSenhaUsuario(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({ message: 'Senha atualizada com sucesso' });
        expect(next).not.toHaveBeenCalled();
    });

    test('resetarSenhaUsuario reseta senha', async () => {
        req.params.id = 1;

        jest.spyOn(UsuarioService, 'resetarSenha')
            .mockResolvedValue({ message: 'Senha redefinida com sucesso' });

        await UsuarioController.resetarSenhaUsuario(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({ message: 'Senha redefinida com sucesso' });
        expect(next).not.toHaveBeenCalled();
    });

    test('excluirUsuario remove usuário', async () => {
        req.params.id = 1;

        jest.spyOn(UsuarioService, 'excluirUsuario')
            .mockResolvedValue({ message: 'Usuário excluído com sucesso' });

        await UsuarioController.excluirUsuario(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith({ message: 'Usuário excluído com sucesso' });
        expect(next).not.toHaveBeenCalled();
    });

    test('obterUsuariosCompleto retorna lista completa de usuários', async () => {
        const filters = { situacao: AtivoInativoEnum.ATIVO };
        const orderBy = [['nome', 'ASC']];
        req.query = {
            filters: JSON.stringify(filters),
            orderBy: JSON.stringify(orderBy)
        };

        const usuarioCompletoFake = {
            ...usuarioFake,
            valorMensalidade: 100.00
        };

        jest.spyOn(UsuarioService, 'obterUsuariosCompleto')
            .mockResolvedValue([usuarioCompletoFake]);

        await UsuarioController.obterUsuariosCompleto(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith([usuarioCompletoFake]);
        expect(next).not.toHaveBeenCalled();
    });

    test('manipula erros corretamente', async () => {
        const error = new Error('Erro de teste');
        req.params.id = 1;

        jest.spyOn(UsuarioService, 'obterUsuarioPorId')
            .mockRejectedValue(error);

        await UsuarioController.obterUsuarioPorId(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
}); 