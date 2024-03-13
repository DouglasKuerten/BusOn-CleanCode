const PixApi = require('../models/pixApi');

// Controller para obter uma PixApi pelo ID
const obterPixApiPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pixApi = await PixApi.findByPk(id);
        if (pixApi) {
            return res.status(200).json(pixApi);
        }
        throw new Error('PixApi não encontrada.');
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro ao obter PixApi', error: error.message });
    }
};

// Controller para obter todas as PixApis
const obterTodasPixApis = async (req, res) => {
    try {
        const pixApis = await PixApi.findAll();
        res.status(200).json(pixApis);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao obter todas as PixApis' });
    }
};

// Controller para criar uma nova PixApi
const criarPixApi = async (req, res) => {
    try {
        const novaPixApi = await PixApi.create(req.body);
        res.status(201).json(novaPixApi);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao criar nova PixApi' });
    }
};

// Controller para atualizar uma PixApi existente
const atualizarPixApi = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await PixApi.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const pixApiAtualizada = await PixApi.findByPk(id);
            return res.status(200).json(pixApiAtualizada);
        }
        throw new Error('PixApi não encontrada ou não atualizada.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao atualizar PixApi', error: error.message });
    }
};

// Controller para excluir uma PixApi
const excluirPixApi = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await PixApi.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ mensagem: 'PixApi excluída com sucesso.' });
        }
        throw new Error('PixApi não encontrada ou não excluída.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro ao excluir PixApi', error: error.message });
    }
};

module.exports = {
    obterPixApiPorId,
    obterTodasPixApis,
    criarPixApi,
    atualizarPixApi,
    excluirPixApi
};
