'use strict';

import { Sequelize } from 'sequelize';
import Pagamento from '../models/Pagamento.js';
import Usuario from '../models/Usuario.js';
import Associacao from '../models/Associacao.js';
import Curso from '../models/Curso.js';
import Instituicao from '../models/Instituicao.js';
import Parametro from '../models/Parametro.js';
import { buildOrderByClause } from '../utils/buildOrderByClause.js';
import { buildWhereClause } from '../utils/buildWhereClause.js';
import { StatusCodes } from 'http-status-codes';
import BusonException from '../exceptions/BusonException.js';
import SequelizeException from '../exceptions/SequelizeException.js';
import AtivoInativoEnum from '../enum/AtivoInativoEnum.js';
import SituacaoPagamentoEnum from '../enum/SituacaoPagamentoEnum.js';
import pagamentoSchema from '../validators/PagamentoSchema.js';

class PagamentoService {
  async obterPagamentoPorId(id) {
    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Pagamento não encontrado.');
    }
    return pagamento;
  }

  async obterTodosPagamentos(query) {
    const { filters, filtersAssociacao } = query;
    const whereClause = buildWhereClause(filters);
    const whereClauseAssociacao = buildWhereClause(filtersAssociacao);

    return await Pagamento.findAll({
      include: [
        {
          model: Usuario,
          attributes: ['id', 'nome', 'diasUsoTransporte', 'fotoUrl'],
          include: [
            {
              model: Associacao,
              attributes: ['id', 'sigla'],
              where: whereClauseAssociacao,
              required: true,
            },
            {
              model: Curso,
              attributes: ['id', 'nome'],
              include: [{ model: Instituicao, attributes: ['id', 'nome'] }],
            },
          ],
          required: true,
        },
      ],
      attributes: {
        include: [
          [Sequelize.literal('COALESCE(multa, 0) + valor'), 'valorTotal'],
          [Sequelize.literal('COALESCE(multa, 0)'), 'multa'],
        ],
      },
      where: whereClause,
      order: [
        [
          Sequelize.literal(
            "CASE WHEN pagamento.situacao = 'ATRASADO' THEN 1 WHEN pagamento.situacao = 'ABERTO' THEN 2 WHEN pagamento.situacao = 'PAGO' THEN 3 ELSE 4 END"
          ),
          'ASC',
        ],
        [Sequelize.literal('DATE_TRUNC(\'day\', "pagamento"."data_vencimento")'), 'DESC'],
        [Sequelize.literal('"usuario"."nome"'), 'ASC'],
      ],
    });
  }

  async criarPagamento(dados) {
    await pagamentoSchema.validate(dados);
    return await Pagamento.create(dados);
  }

  async atualizarPagamento(id, dados) {
    await pagamentoSchema.validate(dados);
    const [atualizado] = await Pagamento.update(dados, { where: { id } });
    if (!atualizado) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Pagamento não encontrado.');
    }
    return await Pagamento.findByPk(id);
  }

  async excluirPagamento(id) {
    try {
      const excluido = await Pagamento.destroy({ where: { id } });
      if (!excluido) {
        throw new BusonException(StatusCodes.NOT_FOUND, 'Pagamento não encontrado.');
      }
    } catch (error) {
      if (error.name && error.name.startsWith('Sequelize')) {
        throw new SequelizeException(error);
      }
      throw error;
    }
  }

  async aprovarPagamento(id) {
    const [atualizado] = await Pagamento.update({ situacao: SituacaoPagamentoEnum.PAGO, dataPagamento: new Date() }, { where: { id } });
    if (!atualizado) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Pagamento não encontrado.');
    }
  }

  async reprovarPagamento(id) {
    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Pagamento não encontrado.');
    }
    const dataVencimento = pagamento.get('dataVencimento');
    const hoje = new Date();
    const situacao = dataVencimento < hoje ? SituacaoPagamentoEnum.ATRASADO : SituacaoPagamentoEnum.ABERTO;

    const [atualizado] = await Pagamento.update({ situacao, dataPagamento: null }, { where: { id } });

    if (!atualizado) {
      throw new BusonException(StatusCodes.INTERNAL_SERVER_ERROR, 'Falha ao reprovar pagamento.');
    }
  }

  async gerarPagamentosMensaisManualmente(associacaoId) {
    const parametroPagamento = await Parametro.findOne({ where: { associacaoId } });

    if (!parametroPagamento) {
      throw new BusonException(StatusCodes.NOT_FOUND, 'Parâmetros de pagamento não encontrados para essa associação.');
    }

    const usuarios = await Usuario.findAll({
      where: { associacaoId, situacao: AtivoInativoEnum.ATIVO },
    });
    const hojeUTC = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));

    for (const usuario of usuarios) {
      const diasUsoCount = Array.isArray(usuario.diasUsoTransporte) ? usuario.diasUsoTransporte.length : 0;
      const valor = parametroPagamento[`valor${diasUsoCount}`] || 0;

      const dataVencimento = new Date(hojeUTC);
      dataVencimento.setDate(parametroPagamento.diaVencimento);

      await Pagamento.create({
        txId: null,
        pixCopiaCola: null,
        usuarioId: usuario.id,
        tipo: 'PIX',
        valor,
        multa: 0,
        dataVencimento,
        dataPagamento: null,
        situacao: SituacaoPagamentoEnum.ABERTO,
      });
    }
  }
}
export default new PagamentoService();
