import Associacao from '../models/Associacao.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import associacaoSchema from '../validators/AssociacaoSchema.js';
import BusonException from '../exceptions/BusonException.js';
import { StatusCodes } from 'http-status-codes';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AssociacaoService {
  async obterAssociacaoPorId(id) {
    const associacao = await Associacao.findByPk(id);
    if (!associacao) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Associação não encontrada');
    }
    return associacao;
  }

  async obterTodasAssociacoes(filters, orderBy) {
    return await Associacao.findAll({
      where: filters,
      order: orderBy,
    });
  }

  async criarAssociacao(associacaoData, files) {
    await associacaoSchema.validate(associacaoData);

    const logoUrl = files?.logo ? files.logo[0].filename : null;
    const logoDeclaracaoUrl = files?.logoDeclaracao ? files.logoDeclaracao[0].filename : null;

    return await Associacao.create({
      ...associacaoData,
      logoUrl,
      logoDeclaracaoUrl,
    });
  }

  async atualizarAssociacao(id, associacaoData, files) {
    await associacaoSchema.validate(associacaoData);

    const associacaoExistente = await this.obterAssociacaoPorId(id);
    const logoUrl = files?.logo ? files.logo[0].filename : associacaoExistente.logoUrl;
    const logoDeclaracaoUrl = files?.logoDeclaracao ? files.logoDeclaracao[0].filename : associacaoExistente.logoDeclaracaoUrl;

    const [updated] = await Associacao.update({ ...associacaoData, logoUrl, logoDeclaracaoUrl }, { where: { id } });

    if (!updated) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Pagamento não encontrado.');
    }

    await this.deletarImagensAntigas(associacaoExistente, files);
    return await Associacao.findByPk(id);
  }

  async excluirAssociacao(id) {
    try {
      const associacao = await this.obterAssociacaoPorId(id);
      await Associacao.destroy({ where: { id } });
      await this.deletarImagensAntigas(associacao);
    } catch (error) {
      if (error.name && error.name.startsWith('Sequelize')) {
        throw new SequelizeException(error);
      }
      throw error;
    }
  }

  async deletarImagensAntigas(associacao, newFiles = {}) {
    try {
      if (associacao.logoUrl && newFiles.logo) {
        await this.deletarArquivo(associacao.logoUrl);
      }
      if (associacao.logoDeclaracaoUrl && newFiles.logoDeclaracao) {
        await this.deletarArquivo(associacao.logoDeclaracaoUrl);
      }
    } catch (error) {
      console.error('Erro ao deletar imagens antigas:', error);
      throw error;
    }
  }

  async deletarArquivo(filename) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    await fs.unlink(filePath);
  }
}

export default new AssociacaoService();
