const UsuarioOnibus = require('../models/usuario');

// Controller para obter um usuário de ônibus pelo ID
const obterUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioOnibus = await UsuarioOnibus.findByPk(id);
        if (usuarioOnibus) {
            return res.status(200).json(usuarioOnibus);
        }
        throw new Error('Usuário de ônibus não encontrado.');
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter usuário de ônibus', error: error.message });
    }
};

// Controller para obter todos os usuários de ônibus
const obterTodosUsuarios = async (req, res) => {
    try {
        const usuariosOnibus = await UsuarioOnibus.findAll();
        res.status(200).json(usuariosOnibus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao obter todos os usuários de ônibus' });
    }
};

// Controller para criar um novo usuário de ônibus
const criarUsuario = async (req, res) => {
    try {
        const novoUsuarioOnibus = await UsuarioOnibus.create(req.body);
        res.status(201).json(novoUsuarioOnibus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar novo usuário de ônibus' });
    }
};

// Controller para atualizar um usuário de ônibus existente
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await UsuarioOnibus.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const usuarioOnibusAtualizado = await UsuarioOnibus.findByPk(id);
            return res.status(200).json(usuarioOnibusAtualizado);
        }
        throw new Error('Usuário de ônibus não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário de ônibus', error: error.message });
    }
};

// Controller para excluir um usuário de ônibus
const excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await UsuarioOnibus.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ mensagem: 'Usuário de ônibus excluído com sucesso.' });
        }
        throw new Error('Usuário de ônibus não encontrado ou não excluído.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao excluir usuário de ônibus', error: error.message });
    }
};

module.exports = {
    obterUsuarioPorId,
    obterTodosUsuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
};
