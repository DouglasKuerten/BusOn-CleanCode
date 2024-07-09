const TemplateDocumento = require('../models/templateDocumento');
const Associacao = require('../models/associacao');
const { getFormattedSequelizeExceptions } = require('../utils/Exceptions');

const criarTemplateDocumento = async (req, res) => {
    try {
        const novoTemplate = await TemplateDocumento.create(req.body);
        res.status(201).json(novoTemplate);
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error);
        console.error(erro);
        res.status(500).json({ message: 'Erro ao criar novo template de documento', error: erro.message });
    }
};

const obterTodosTemplatesDocumentos = async (req, res) => {
    try {
        const templates = await TemplateDocumento.findAll({
            include: [
                {
                    model: Associacao,
                    attributes: ['id', 'sigla'],
                }
            ],
            attributes: ['id', 'nome', 'situacao']
        });
        res.status(200).json(templates);
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error);
        console.error(erro);
        res.status(500).json({ message: 'Erro ao buscar templates de documentos', error: erro.message });
    }
};

const obterTemplateDocumentoPorId = async (req, res) => {
    try {
        const template = await TemplateDocumento.findByPk(req.params.id, {
            include: [{ model: Associacao }],
        });
        if (!template) {
            return res.status(404).json({ message: 'Template de documento não encontrado' });
        }
        res.status(200).json(template);
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error);
        console.error(erro);
        res.status(500).json({ message: 'Erro ao buscar template de documento', error: erro.message });
    }
};

const atualizarTemplateDocumento = async (req, res) => {
    try {
        const template = await TemplateDocumento.findByPk(req.params.id);
        if (!template) {
            return res.status(404).json({ message: 'Template de documento não encontrado' });
        }
        await template.update(req.body);
        res.status(200).json(template);
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error);
        console.error(erro);
        res.status(500).json({ message: 'Erro ao atualizar template de documento', error: erro.message });
    }
};

const excluirTemplateDocumento = async (req, res) => {
    try {
        const template = await TemplateDocumento.findByPk(req.params.id);
        if (!template) {
            return res.status(404).json({ message: 'Template de documento não encontrado' });
        }
        await template.destroy();
        res.status(204).json({ message: 'Template de documento deletado com sucesso' });
    } catch (error) {
        const erro = getFormattedSequelizeExceptions(error);
        console.error(erro);
        res.status(500).json({ message: 'Erro ao deletar template de documento', error: erro.message });
    }
};

module.exports = {
    criarTemplateDocumento,
    obterTodosTemplatesDocumentos,
    obterTemplateDocumentoPorId,
    atualizarTemplateDocumento,
    excluirTemplateDocumento,
};
