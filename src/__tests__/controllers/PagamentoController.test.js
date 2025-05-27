import { jest } from '@jest/globals';
import PagamentoController from '../../controllers/PagamentoController.js';
import PagamentoService from '../../services/PagamentoService.js';
import { StatusCodes } from 'http-status-codes';

describe('PagamentoController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    test('obterPagamentoPorId retorna pagamento quando encontrado', async () => {
        const pagamentoFake = {
            id: 1,
            usuarioId: 1,
            tipo: 'PIX',
            valor: 100.00
        };

        req.params.id = 1;

        jest.spyOn(PagamentoService, 'obterPagamentoPorId')
            .mockResolvedValue(pagamentoFake);

        await PagamentoController.obterPagamentoPorId(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(pagamentoFake);
        expect(next).not.toHaveBeenCalled();
    });

    test('obterTodosPagamentos retorna lista de pagamentos', async () => {
        const pagamentosFake = [{
            id: 1,
            usuarioId: 1,
            tipo: 'PIX',
            valor: 100.00
        }];

        req.query = {
            filters: JSON.stringify({ situacao: 'ABERTO' }),
            filtersAssociacao: JSON.stringify({ id: 1 })
        };

        jest.spyOn(PagamentoService, 'obterTodosPagamentos')
            .mockResolvedValue(pagamentosFake);

        await PagamentoController.obterTodosPagamentos(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(pagamentosFake);
        expect(next).not.toHaveBeenCalled();
    });

    test('criarPagamento cria novo pagamento', async () => {
        const novoPagamento = {
            usuarioId: 1,
            tipo: 'PIX',
            valor: 100.00
        };

        req.body = novoPagamento;

        jest.spyOn(PagamentoService, 'criarPagamento')
            .mockResolvedValue({ id: 1, ...novoPagamento });

        await PagamentoController.criarPagamento(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1, ...novoPagamento }));
        expect(next).not.toHaveBeenCalled();
    });

    test('atualizarPagamento atualiza pagamento existente', async () => {
        const dadosAtualizacao = {
            valor: 150.00
        };

        req.params.id = 1;
        req.body = dadosAtualizacao;

        jest.spyOn(PagamentoService, 'atualizarPagamento')
            .mockResolvedValue({ id: 1, ...dadosAtualizacao });

        await PagamentoController.atualizarPagamento(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 1, ...dadosAtualizacao }));
        expect(next).not.toHaveBeenCalled();
    });

    test('excluirPagamento remove pagamento', async () => {
        req.params.id = 1;

        jest.spyOn(PagamentoService, 'excluirPagamento')
            .mockResolvedValue();

        await PagamentoController.excluirPagamento(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
        expect(res.send).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('aprovarPagamento aprova pagamento', async () => {
        req.params.id = 1;

        jest.spyOn(PagamentoService, 'aprovarPagamento')
            .mockResolvedValue();

        await PagamentoController.aprovarPagamento(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
        expect(res.send).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('reprovarPagamento reprova pagamento', async () => {
        req.params.id = 1;

        jest.spyOn(PagamentoService, 'reprovarPagamento')
            .mockResolvedValue();

        await PagamentoController.reprovarPagamento(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
        expect(res.send).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('gerarPagamentosMensaisManualmente gera pagamentos', async () => {
        req.params.associacaoId = 1;

        jest.spyOn(PagamentoService, 'gerarPagamentosMensaisManualmente')
            .mockResolvedValue();

        await PagamentoController.gerarPagamentosMensaisManualmente(req, res, next);

        expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
        expect(res.send).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test('manipula erros corretamente', async () => {
        const error = new Error('Erro de teste');
        req.params.id = 1;

        jest.spyOn(PagamentoService, 'obterPagamentoPorId')
            .mockRejectedValue(error);

        await PagamentoController.obterPagamentoPorId(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
}); 