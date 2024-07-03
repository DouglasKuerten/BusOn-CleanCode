const Parametro = require('../../models/parametro');
const Usuario = require('../../models/usuario');
const Pagamento = require('../../models/pagamento');

async function gerarPagamentosMensais(req, res) {
    try {
        const parametrosPagamento = await Parametro.findAll({ where: { gerarPagamentosAutomatico: 'SIM' } });

        for (const parametroPagamento of parametrosPagamento) {

            const usuariosPagamento = await Usuario.findAll({
                where: {
                    associacaoId: parametroPagamento.dataValues.associacaoId,
                    situacao: 'ATIVO'
                }
            });

            for (const usuarioPagamento of usuariosPagamento) {
                let valorPagamento = 0;
                switch (usuarioPagamento.dataValues.diasUsoTransporte.length) {
                    case 1:
                        valorPagamento = parametroPagamento.dataValues.valor1
                        break;
                    case 2:
                        valorPagamento = parametroPagamento.dataValues.valor2
                        break;
                    case 3:
                        valorPagamento = parametroPagamento.dataValues.valor3
                        break;
                    case 4:
                        valorPagamento = parametroPagamento.dataValues.valor4
                        break;
                    case 5:
                        valorPagamento = parametroPagamento.dataValues.valor5
                        break;
                    case 6:
                        valorPagamento = parametroPagamento.dataValues.valor6
                        break;
                    case 7:
                        valorPagamento = parametroPagamento.dataValues.valor7
                        break;
                    default:
                        valorPagamento = 0;
                        break;
                }
                let dataVencimento = new Date(new Date().setDate(parametroPagamento.dataValues.diaVencimento));

                let body = {
                    txId: null,
                    pixCopiaCola: null,
                    usuarioId: usuarioPagamento.dataValues.id,
                    tipo: "PIX",
                    valor: valorPagamento,
                    multa: 0,
                    dataVencimento: dataVencimento,
                    dataPagamento: null,
                    situacao: "ABERTO"
                }

                const novoPagamento = await Pagamento.create(body);

            }

        }

        console.log('Pagamentos gerados para todos os usuários! ');
    } catch (error) {
        console.error(error);
        console.log('Erro ao criar novo pagamento');
    }
};

module.exports = async () => {
    await gerarPagamentosMensais()
}