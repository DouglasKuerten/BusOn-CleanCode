import { describe, expect, jest, test } from '@jest/globals';
import { promises as fs } from 'fs';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import Associacao from '../../models/Associacao.js';
import AssociacaoService from '../../services/AssociacaoService.js';

describe('AssociacaoService', () => {
  test('obterAssociacaoPorId retorna associação quando encontrada', async () => {
    const associacaoFake = { id: 1, nome: 'Testando Ltda' };

    jest.spyOn(Associacao, 'findByPk').mockResolvedValue(associacaoFake);

    await expect(AssociacaoService.obterAssociacaoPorId(1)).resolves.toEqual(
      associacaoFake,
    );
  });

  test('obterAssociacaoPorId lança erro quando associação não encontrada', async () => {
    jest.spyOn(Associacao, 'findByPk').mockResolvedValue(null);

    await expect(AssociacaoService.obterAssociacaoPorId(1)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Associação não encontrada',
      }),
    );
  });

  test('obterTodasAssociacoes retorna lista de associações', async () => {
    const associacoesFake = [
      { id: 1, nome: 'Associação 1' },
      { id: 2, nome: 'Associação 2' },
    ];
    const filters = { situacao: 'ATIVO' };
    const orderBy = [['nome', 'ASC']];

    jest.spyOn(Associacao, 'findAll').mockResolvedValue(associacoesFake);

    await expect(
      AssociacaoService.obterTodasAssociacoes(filters, orderBy),
    ).resolves.toEqual(associacoesFake);

    expect(Associacao.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        where: filters,
        order: orderBy,
      }),
    );
  });

  test('criarAssociacao cria nova associação com sucesso', async () => {
    const novaAssociacao = {
      nome: 'Nova Associação',
      cnpj: '12345678901234',
      sigla: 'NA',
      cidade: 'Test City',
      cep: '12345678',
      uf: 'SP',
      bairro: 'Test',
      endereco: 'Rua Test, 123',
      situacao: 'ATIVO',
    };

    const files = {
      logo: [{ filename: 'logo.png' }],
      logoDeclaracao: [{ filename: 'logo_dec.png' }],
    };

    const associacaoCriada = {
      id: 1,
      ...novaAssociacao,
      logoUrl: 'logo.png',
      logoDeclaracaoUrl: 'logo_dec.png',
    };

    jest.spyOn(Associacao, 'create').mockResolvedValue(associacaoCriada);

    await expect(
      AssociacaoService.criarAssociacao(novaAssociacao, files),
    ).resolves.toEqual(associacaoCriada);

    expect(Associacao.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...novaAssociacao,
        logoUrl: 'logo.png',
        logoDeclaracaoUrl: 'logo_dec.png',
      }),
    );
  });

  test('atualizarAssociacao atualiza associação existente', async () => {
    const id = 1;
    const dadosAtualizacao = {
      nome: 'Associação Atualizada',
      cnpj: '12345678901234',
      sigla: 'NA',
      cidade: 'Test City',
      cep: '12345678',
      uf: 'SP',
      bairro: 'Test',
      endereco: 'Rua Test, 123',
      situacao: 'ATIVO',
    };

    const associacaoExistente = {
      id,
      ...dadosAtualizacao,
      logoUrl: 'logo_antigo.png',
      logoDeclaracaoUrl: 'logo_dec_antigo.png',
    };

    const files = {
      logo: [{ filename: 'novo_logo.png' }],
    };

    jest
      .spyOn(Associacao, 'findByPk')
      .mockResolvedValueOnce(associacaoExistente)
      .mockResolvedValueOnce({
        ...associacaoExistente,
        logoUrl: 'novo_logo.png',
      });

    jest.spyOn(Associacao, 'update').mockResolvedValue([1]);

    jest.spyOn(fs, 'unlink').mockResolvedValue();

    jest.spyOn(path, 'join').mockReturnValue('/path/to/logo_antigo.png');

    await expect(
      AssociacaoService.atualizarAssociacao(id, dadosAtualizacao, files),
    ).resolves.toEqual(
      expect.objectContaining({
        ...dadosAtualizacao,
        logoUrl: 'novo_logo.png',
      }),
    );
  });

  test('excluirAssociacao remove associação e seus arquivos', async () => {
    const associacaoParaExcluir = {
      id: 1,
      nome: 'Associação para Excluir',
      logoUrl: 'logo.png',
      logoDeclaracaoUrl: 'logo_dec.png',
    };

    jest.spyOn(Associacao, 'findByPk').mockResolvedValue(associacaoParaExcluir);

    jest.spyOn(Associacao, 'destroy').mockResolvedValue(1);

    jest.spyOn(fs, 'unlink').mockResolvedValue();

    jest.spyOn(path, 'join').mockReturnValue('/path/to/file.png');

    await AssociacaoService.excluirAssociacao(1);

    expect(Associacao.destroy).toHaveBeenCalledWith({ where: { id: 1 } });

    expect(fs.unlink).toHaveBeenCalled();
  });
});
