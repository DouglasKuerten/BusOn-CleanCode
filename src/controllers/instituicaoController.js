const Instituicao = require('../models/instituicao');

// Controller para obter uma instituição pelo ID
const obterInstituicaoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const instituicao = await Instituicao.findByPk(id);
        if (instituicao) {
            return res.status(200).json(instituicao);
        }
        throw new Error('Instituição não encontrada.');
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter instituição', error: error.message });
    }
};

// Controller para obter todas as instituições
const obterTodasInstituicoes = async (req, res) => {
    try {
        const instituicoes = await Instituicao.findAll();
        res.status(200).json(instituicoes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao obter todas as instituições' });
    }
};

// Controller para criar uma nova instituição
const criarInstituicao = async (req, res) => {
    try {
        const novaInstituicao = await Instituicao.create(req.body);
        res.status(201).json(novaInstituicao);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar nova instituição' });
    }
};

// Controller para atualizar uma instituição existente
const atualizarInstituicao = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Instituicao.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const instituicaoAtualizada = await Instituicao.findByPk(id);
            return res.status(200).json(instituicaoAtualizada);
        }
        throw new Error('Instituição não encontrada ou não atualizada.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar instituição', error: error.message });
    }
};

// Controller para excluir uma instituição
const excluirInstituicao = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Instituicao.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ mensagem: 'Instituição excluída com sucesso.' });
        }
        throw new Error('Instituição não encontrada ou não excluída.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao excluir instituição', error: error.message });
    }
};

module.exports = {
    obterInstituicaoPorId,
    obterTodasInstituicoes,
    criarInstituicao,
    atualizarInstituicao,
    excluirInstituicao
};
