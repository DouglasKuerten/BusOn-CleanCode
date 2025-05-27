'use strict';

import Instituicao from '../models/Instituicao.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import BusonException from '../exceptions/BusonException.js';
import SequelizeException from '../exceptions/SequelizeException.js';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs/promises';
import path from 'path';
import instituicaoSchema from '../validators/InstituicaoSchema.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class InstituicaoService {
  async obterInstituicaoPorId(id) {
    const instituicao = await Instituicao.findByPk(id);
    if (!instituicao) {
      throw new BusonException(
        StatusCodes.NOT_FOUND,
        'Instituição não encontrada.',
      );
    }
    return instituicao;
  }

  async obterTodasInstituicoes(query) {
    const whereClause = buildWhereClause(query.filters);
    const orderClause = buildOrderByClause(query.orderBy);

    return await Instituicao.findAll({
      where: whereClause,
      order: orderClause,
    });
  }

  async criarInstituicao(dados, arquivo) {
    const instituicaoBody = dados.data ? JSON.parse(dados.data) : dados;
    await instituicaoSchema.validate(instituicaoBody);
    return await Instituicao.create({
      ...instituicaoBody,
      logoUrl: arquivo?.filename || null,
    });
  }

  async atualizarInstituicao(id, dados, arquivo) {
    const instituicaoBody = dados.data ? JSON.parse(dados.data) : dados;
    await instituicaoSchema.validate(instituicaoBody);
    const instituicaoExistente = await this.obterInstituicaoPorId(id);

    const [atualizado] = await Instituicao.update(
      {
        ...instituicaoBody,
        logoUrl: arquivo?.filename || instituicaoExistente.logoUrl,
      },
      { where: { id } },
    );

    if (atualizado) {
      if (arquivo?.filename && instituicaoExistente.logoUrl) {
        try {
          const caminhoImagemAntiga = path.join(
            __dirname,
            '..',
            '..',
            'uploads',
            instituicaoExistente.logoUrl,
          );
          await fs.unlink(caminhoImagemAntiga);
        } catch (error) {
          console.error('Erro ao excluir imagem antiga:', error);
        }
      }
      return await this.obterInstituicaoPorId(id);
    }
    throw new BusonException(
      StatusCodes.NOT_FOUND,
      'Instituição não encontrada.',
    );
  }

  async excluirInstituicao(id) {
    try {
      const instituicao = await this.obterInstituicaoPorId(id);
      const excluido = await Instituicao.destroy({ where: { id } });

      if (excluido) {
        if (instituicao.logoUrl) {
          try {
            const caminhoImagem = path.join(
              __dirname,
              '..',
              '..',
              'uploads',
              instituicao.logoUrl,
            );
            await fs.unlink(caminhoImagem);
          } catch (error) {
            console.error('Erro ao excluir logo da instituição:', error);
          }
        }
        return;
      }
      throw new BusonException(
        StatusCodes.NOT_FOUND,
        'Instituição não encontrada.',
      );
    } catch (error) {
      if (error.name && error.name.startsWith('Sequelize')) {
        throw new SequelizeException(error);
      }
      throw error;
    }
  }
}

export default new InstituicaoService();
