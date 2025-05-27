import { jest } from '@jest/globals';
import ParametroService from '../../services/ParametroService.js';
import Parametro from '../../models/Parametro.js';
import BusonException from '../../exceptions/BusonException.js';
import { StatusCodes } from 'http-status-codes';

process.env.NODE_ENV = 'test';

describe('ParametroService', () => {
    test('obterParametroPorId retorna parâmetro quando encontrado', async () => {
        const parametroFake = {
            id: 1,
            associacaoId: 1,
            valor1: 50.00,
            valor2: 100.00,
            valor3: 150.00,
            valor4: 200.00,
            valor5: 250.00,
            valor6: 300.00,
            valorMulta: 10.00,
            diaVencimento: 10,
            diasToleranciaMulta: 5,
            liberaAlteracaoDadosPessoais: 'LIBERADO',
            gerarPagamentosAutomatico: 'SIM'
        };

        jest.spyOn(Parametro, 'findByPk')
            .mockResolvedValue(parametroFake);

        await expect(ParametroService.obterParametroPorId(1))
            .resolves
            .toEqual(parametroFake);
    });

    test('obterParametroPorId lança erro quando parâmetro não encontrado', async () => {
        jest.spyOn(Parametro, 'findByPk')
            .mockResolvedValue(null);

        await expect(ParametroService.obterParametroPorId(1))
            .rejects
            .toEqual(expect.objectContaining({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Parâmetros da associação não foram encontrados!'
            }));
    });

    test('obterParametroDaAssociacaoPorId retorna parâmetro da associação', async () => {
        const parametroFake = {
            id: 1,
            associacaoId: 1,
            valor1: 50.00,
            valorMulta: 10.00,
            diaVencimento: 10,
            liberaAlteracaoDadosPessoais: 'LIBERADO'
        };

        jest.spyOn(Parametro, 'findOne')
            .mockResolvedValue(parametroFake);

        await expect(ParametroService.obterParametroDaAssociacaoPorId(1))
            .resolves
            .toEqual(parametroFake);

        expect(Parametro.findOne)
            .toHaveBeenCalledWith({ where: { associacaoId: 1 } });
    });

    test('listarTodosParametros retorna lista de parâmetros', async () => {
        const parametrosFake = [
            {
                id: 1,
                associacaoId: 1,
                valor1: 50.00,
                valorMulta: 10.00
            },
            {
                id: 2,
                associacaoId: 2,
                valor1: 60.00,
                valorMulta: 15.00
            }
        ];

        jest.spyOn(Parametro, 'findAll')
            .mockResolvedValue(parametrosFake);

        await expect(ParametroService.listarTodosParametros())
            .resolves
            .toEqual(parametrosFake);
    });

    test('criarParametro cria novo parâmetro com sucesso', async () => {
        const novoParametro = {
            associacaoId: 1,
            valor1: 50.00,
            valor2: 100.00,
            valor3: 150.00,
            valor4: 200.00,
            valor5: 250.00,
            valor6: 300.00,
            valorMulta: 10.00,
            diaVencimento: 10,
            diasToleranciaMulta: 5,
            liberaAlteracaoDadosPessoais: 'LIBERADO',
            gerarPagamentosAutomatico: 'SIM'
        };

        const parametroCriado = {
            id: 1,
            ...novoParametro
        };

        jest.spyOn(Parametro, 'create')
            .mockResolvedValue(parametroCriado);

        await expect(ParametroService.criarParametro(novoParametro))
            .resolves
            .toEqual(parametroCriado);

        expect(Parametro.create)
            .toHaveBeenCalledWith(novoParametro);
    });

    test('atualizarParametro atualiza parâmetro existente', async () => {
        const id = 1;
        const dadosAtualizacao = {
            associacaoId: 1,
            valor1: 55.00,
            valor2: 110.00,
            valor3: 165.00,
            valor4: 220.00,
            valor5: 275.00,
            valor6: 330.00,
            valorMulta: 12.00,
            diaVencimento: 15,
            diasToleranciaMulta: 5,
            liberaAlteracaoDadosPessoais: 'BLOQUEADO',
            gerarPagamentosAutomatico: 'NAO'
        };

        const parametroAtualizado = {
            id,
            ...dadosAtualizacao
        };

        jest.spyOn(Parametro, 'update')
            .mockResolvedValue([1]);

        jest.spyOn(Parametro, 'findByPk')
            .mockResolvedValue(parametroAtualizado);

        await expect(ParametroService.atualizarParametro(id, dadosAtualizacao))
            .resolves
            .toEqual(parametroAtualizado);

        expect(Parametro.update)
            .toHaveBeenCalledWith(
                dadosAtualizacao,
                expect.objectContaining({ where: { id } })
            );
    });

    test('excluirParametro remove parâmetro com sucesso', async () => {
        jest.spyOn(Parametro, 'destroy')
            .mockResolvedValue(1);

        await expect(ParametroService.excluirParametro(1))
            .resolves
            .toBe(true);

        expect(Parametro.destroy)
            .toHaveBeenCalledWith({ where: { id: 1 } });
    });

    test('excluirParametro lança erro quando parâmetro não encontrado', async () => {
        jest.spyOn(Parametro, 'destroy')
            .mockResolvedValue(0);

        await expect(ParametroService.excluirParametro(999))
            .rejects
            .toEqual(expect.objectContaining({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Parâmetro não encontrado'
            }));
    });
}); 