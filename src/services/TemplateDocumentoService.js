import { templateDocumentoSchema } from '../validators/TemplateDocumentoSchema.js';
import TemplateDocumento from '../models/TemplateDocumento.js';
import Associacao from '../models/Associacao.js';
import BusonException from '../exceptions/BusonException.js';
import { StatusCodes } from 'http-status-codes';

class TemplateDocumentoService {
  async criarTemplateDocumento(dados) {
    await templateDocumentoSchema.validate(dados);
    return await TemplateDocumento.create(dados);
  }

  async obterTodosTemplatesDocumentos() {
    return await TemplateDocumento.findAll({
      include: [
        {
          model: Associacao,
          attributes: ['id', 'sigla'],
        },
      ],
      attributes: ['id', 'nome', 'situacao', 'tipo_impressao'],
    });
  }

  async obterTemplateDocumentoPorId(id) {
    const template = await TemplateDocumento.findByPk(id, {
      include: [{ model: Associacao }],
    });
    if (!template) {
      throw new BusonException(
        StatusCodes.NOT_FOUND,
        'Template de documento não encontrado',
      );
    }
    return template;
  }

  async atualizarTemplateDocumento(id, dados) {
    const template = await this.obterTemplateDocumentoPorId(id);
    await templateDocumentoSchema.validate(dados);
    return await template.update(dados);
  }

  async excluirTemplateDocumento(id) {
    const template = await this.obterTemplateDocumentoPorId(id);
    await template.destroy();
  }
}

export default new TemplateDocumentoService();
