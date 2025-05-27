import { describe, expect, jest, test } from '@jest/globals';
import fs from 'fs/promises';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import Instituicao from '../../models/Instituicao.js';
import InstituicaoService from '../../services/InstituicaoService.js';

describe('InstituicaoService', () => {
  test('obterInstituicaoPorId retorna instituição quando encontrada', async () => {
    const instituicaoFake = {
      id: 1,
      nome: 'Faculdade Teste',
      endereco: 'Rua Teste, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
      logoUrl: 'logo.png',
    };

    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue(instituicaoFake);

    await expect(InstituicaoService.obterInstituicaoPorId(1)).resolves.toEqual(
      instituicaoFake,
    );
  });

  test('obterInstituicaoPorId lança erro quando instituição não encontrada', async () => {
    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue(null);

    await expect(InstituicaoService.obterInstituicaoPorId(1)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Instituição não encontrada.',
      }),
    );
  });

  test('criarInstituicao cria nova instituição com logo', async () => {
    const novaInstituicao = {
      nome: 'Nova Faculdade',
      endereco: 'Rua Nova, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
    };

    const arquivo = {
      filename: 'logo.png',
    };

    const instituicaoCriada = {
      id: 1,
      ...novaInstituicao,
      logoUrl: arquivo.filename,
    };

    jest.spyOn(Instituicao, 'create').mockResolvedValue(instituicaoCriada);

    await expect(
      InstituicaoService.criarInstituicao(novaInstituicao, arquivo),
    ).resolves.toEqual(instituicaoCriada);

    expect(Instituicao.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...novaInstituicao,
        logoUrl: arquivo.filename,
      }),
    );
  });

  test('atualizarInstituicao atualiza instituição existente com nova logo', async () => {
    const id = 1;
    const dadosAtualizacao = {
      nome: 'Faculdade Atualizada',
      endereco: 'Rua Atualizada, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
    };

    const arquivo = {
      filename: 'nova_logo.png',
    };

    const instituicaoExistente = {
      id,
      ...dadosAtualizacao,
      logoUrl: 'logo_antiga.png',
    };

    const instituicaoAtualizada = {
      ...instituicaoExistente,
      logoUrl: arquivo.filename,
    };

    jest
      .spyOn(Instituicao, 'findByPk')
      .mockResolvedValueOnce(instituicaoExistente)
      .mockResolvedValueOnce(instituicaoAtualizada);

    jest.spyOn(Instituicao, 'update').mockResolvedValue([1]);

    jest.spyOn(fs, 'unlink').mockResolvedValue();

    jest.spyOn(path, 'join').mockReturnValue('/caminho/para/logo_antiga.png');

    await expect(
      InstituicaoService.atualizarInstituicao(id, dadosAtualizacao, arquivo),
    ).resolves.toEqual(instituicaoAtualizada);

    expect(fs.unlink).toHaveBeenCalledWith('/caminho/para/logo_antiga.png');

    expect(Instituicao.update).toHaveBeenCalledWith(
      expect.objectContaining({
        ...dadosAtualizacao,
        logoUrl: arquivo.filename,
      }),
      expect.objectContaining({ where: { id } }),
    );
  });

  test('excluirInstituicao remove instituição e logo', async () => {
    const instituicaoParaExcluir = {
      id: 1,
      nome: 'Faculdade para Excluir',
      endereco: 'Rua para Excluir, 123',
      situacao: 'ATIVO',
      associacaoId: 1,
      logoUrl: 'logo.png',
    };

    jest
      .spyOn(Instituicao, 'findByPk')
      .mockResolvedValue(instituicaoParaExcluir);

    jest.spyOn(Instituicao, 'destroy').mockResolvedValue(1);

    jest.spyOn(fs, 'unlink').mockResolvedValue();

    jest.spyOn(path, 'join').mockReturnValue('/caminho/para/logo.png');

    await expect(
      InstituicaoService.excluirInstituicao(1),
    ).resolves.not.toThrow();

    expect(fs.unlink).toHaveBeenCalledWith('/caminho/para/logo.png');

    expect(Instituicao.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  test('excluirInstituicao lança erro quando instituição não encontrada', async () => {
    jest.spyOn(Instituicao, 'findByPk').mockResolvedValue(null);

    jest.spyOn(Instituicao, 'destroy').mockResolvedValue(0);

    await expect(InstituicaoService.excluirInstituicao(999)).rejects.toEqual(
      expect.objectContaining({
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Instituição não encontrada.',
      }),
    );
  });
});
