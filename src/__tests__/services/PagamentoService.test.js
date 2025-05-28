import { describe, expect, jest, test } from '@jest/globals';
import { StatusCodes } from 'http-status-codes';
import AtivoInativoEnum from '../../enum/AtivoInativoEnum.js';
import SituacaoPagamentoEnum from '../../enum/SituacaoPagamentoEnum.js';
import Pagamento from '../../models/Pagamento.js';
import Parametro from '../../models/Parametro.js';
import Usuario from '../../models/Usuario.js';
import PagamentoService from '../../services/PagamentoService.js';

describe('PagamentoService', () => {
  const pagamentoFake = {
    id: 1,
    txId: 'tx123',
    pixCopiaCola: 'pix123',
    usuarioId: 1,
    tipo: 'PIX',
    valor: 100.0,
    multa: 0,
    dataVencimento: new Date('2024-04-10'),
    dataPagamento: null,
    situacao: SituacaoPagamentoEnum.ABERTO,
  };

  test('obterPagamentoPorId retorna pagamento quando encontrado', async () => {
    jest.spyOn(Pagamento, 'findByPk').mockResolvedValue(pagamentoFake);

    await expect(PagamentoService.obterPagamentoPorId(1)).resolves.toEqual(
      pagamentoFake,
    );
  });

  test('obterPagamentoPorId lança erro quando pagamento não encontrado', async () => {
    jest.spyOn(Pagamento, 'findByPk').mockResolvedValue(null);

    await expect(PagamentoService.obterPagamentoPorId(1)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Pagamento não encontrado.',
      }),
    );
  });

  test('criarPagamento cria novo pagamento', async () => {
    const novoPagamento = {
      usuarioId: 1,
      tipo: 'PIX',
      valor: 100.0,
      situacao: SituacaoPagamentoEnum.ABERTO,
    };

    jest
      .spyOn(Pagamento, 'create')
      .mockResolvedValue({ id: 1, ...novoPagamento });

    await expect(
      PagamentoService.criarPagamento(novoPagamento),
    ).resolves.toEqual(expect.objectContaining({ id: 1, ...novoPagamento }));
  });

  test('atualizarPagamento atualiza pagamento existente', async () => {
    const id = 1;
    const dadosAtualizacao = {
      usuarioId: 1,
      tipo: 'PIX',
      valor: 150.0,
      situacao: SituacaoPagamentoEnum.PAGO,
    };

    jest.spyOn(Pagamento, 'update').mockResolvedValue([1]);

    jest
      .spyOn(Pagamento, 'findByPk')
      .mockResolvedValue({ id, ...dadosAtualizacao });

    await expect(
      PagamentoService.atualizarPagamento(id, dadosAtualizacao),
    ).resolves.toEqual(expect.objectContaining({ id, ...dadosAtualizacao }));
  });

  test('excluirPagamento remove pagamento', async () => {
    jest.spyOn(Pagamento, 'destroy').mockResolvedValue(1);

    await expect(PagamentoService.excluirPagamento(1)).resolves.not.toThrow();
  });

  test('aprovarPagamento atualiza situação para PAGO', async () => {
    jest.spyOn(Pagamento, 'update').mockResolvedValue([1]);

    await expect(PagamentoService.aprovarPagamento(1)).resolves.not.toThrow();

    expect(Pagamento.update).toHaveBeenCalledWith(
      expect.objectContaining({
        situacao: SituacaoPagamentoEnum.PAGO,
        dataPagamento: expect.any(Date),
      }),
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  test('reprovarPagamento atualiza situação baseado na data de vencimento', async () => {
    const pagamentoVencido = {
      ...pagamentoFake,
      dataVencimento: new Date('2024-01-01'),
      get: function (field) {
        return this[field];
      },
    };

    jest.spyOn(Pagamento, 'findByPk').mockResolvedValue(pagamentoVencido);

    jest.spyOn(Pagamento, 'update').mockResolvedValue([1]);

    await expect(PagamentoService.reprovarPagamento(1)).resolves.not.toThrow();

    expect(Pagamento.update).toHaveBeenCalledWith(
      expect.objectContaining({
        situacao: SituacaoPagamentoEnum.ATRASADO,
        dataPagamento: null,
      }),
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  test('gerarPagamentosMensaisManualmente gera pagamentos para usuários ativos', async () => {
    const parametroFake = {
      associacaoId: 1,
      valor2: 100.0,
      diaVencimento: 10,
    };

    const usuariosFake = [
      {
        id: 1,
        diasUsoTransporte: ['SEGUNDA', 'TERCA'],
        situacao: AtivoInativoEnum.ATIVO,
      },
    ];

    jest.spyOn(Parametro, 'findOne').mockResolvedValue(parametroFake);

    jest.spyOn(Usuario, 'findAll').mockResolvedValue(usuariosFake);

    jest.spyOn(Pagamento, 'create').mockResolvedValue(pagamentoFake);

    await expect(
      PagamentoService.gerarPagamentosMensaisManualmente(1),
    ).resolves.not.toThrow();

    expect(Pagamento.create).toHaveBeenCalledWith(
      expect.objectContaining({
        usuarioId: 1,
        tipo: 'PIX',
        valor: 100.0,
        situacao: SituacaoPagamentoEnum.ABERTO,
      }),
    );
  });
});
