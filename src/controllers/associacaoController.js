const Associacao = require('../models/associacao');

// Controller para obter uma associação pelo ID
const obterAssociacaoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const associacao = await Associacao.findByPk(id);
        if (associacao) {
            return res.status(200).json(associacao);
        }
        throw new Error('Associação não encontrada.');
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter associação', error: error.message });
    }
};

// Controller para obter todas as associações
const obterTodasAssociacoes = async (req, res) => {
    try {
        const associacoes = await Associacao.findAll();
        res.status(200).json(associacoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao obter todas as associações' });
    }
};

// Controller para criar uma nova associação
const criarAssociacao = async (req, res) => {
    try {
        const novaAssociacao = await Associacao.create(req.body);
        res.status(201).json(novaAssociacao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar nova associação' });
    }
};

// Controller para atualizar uma associação existente
const atualizarAssociacao = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Associacao.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const associacaoAtualizada = await Associacao.findByPk(id);
            return res.status(200).json(associacaoAtualizada);
        }
        throw new Error('Associação não encontrada ou não atualizada.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar associação', error: error.message });
    }
};

// Controller para excluir uma associação
const excluirAssociacao = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Associacao.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ mensagem: 'Associação excluída com sucesso.' });
        }
        throw new Error('Associação não encontrada ou não excluída.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao excluir associação', error: error.message });
    }
};

module.exports = {
    obterAssociacaoPorId,
    obterTodasAssociacoes,
    criarAssociacao,
    atualizarAssociacao,
    excluirAssociacao
};
