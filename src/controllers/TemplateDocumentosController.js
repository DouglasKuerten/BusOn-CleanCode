import TemplateDocumentoService from '../services/TemplateDocumentoService.js';
import { StatusCodes } from 'http-status-codes';

const criarTemplateDocumento = async (req, res, next) => {
    try {
        const novoTemplate = await TemplateDocumentoService.criarTemplateDocumento(req.body);
        res.status(StatusCodes.CREATED).json(novoTemplate);
    } catch (error) {
        next(error);
    }
};

const obterTodosTemplatesDocumentos = async (req, res, next) => {
    try {
        const templates = await TemplateDocumentoService.obterTodosTemplatesDocumentos();
        res.status(StatusCodes.OK).json(templates);
    } catch (error) {
        next(error);
    }
};

const obterTemplateDocumentoPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await TemplateDocumentoService.obterTemplateDocumentoPorId(id);
        res.status(StatusCodes.OK).json(template);
    } catch (error) {
        next(error);
    }
};

const atualizarTemplateDocumento = async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await TemplateDocumentoService.atualizarTemplateDocumento(id, req.body);
        res.status(StatusCodes.OK).json(template);
    } catch (error) {
        next(error);
    }
};

const excluirTemplateDocumento = async (req, res, next) => {
    try {
        const { id } = req.params;
        await TemplateDocumentoService.excluirTemplateDocumento(id);
        res.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
        next(error);
    }
};

export default {
    criarTemplateDocumento,
    obterTodosTemplatesDocumentos,
    obterTemplateDocumentoPorId,
    atualizarTemplateDocumento,
    excluirTemplateDocumento
};
