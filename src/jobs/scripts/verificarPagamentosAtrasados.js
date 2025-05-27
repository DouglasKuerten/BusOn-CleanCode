import Parametro from '../../models/Parametro.js';
import Usuario from '../../models/Usuario.js';
import Pagamento from '../../models/Pagamento.js';
import { Op } from 'sequelize';
import { convertDateToUTC } from '../../utils/converterDateToUtc.js';
import SituacaoPagamentoEnum from '../../enum/SituacaoPagamentoEnum.js';

function calcularDiferencaDias(dataInicial, dataFinal) {
    const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;
    return Math.round((dataInicial - dataFinal) / MILISSEGUNDOS_POR_DIA);
}

function calcularDataComTolerancia(dataVencimento, diasTolerancia) {
    const data = new Date(dataVencimento);
    data.setDate(data.getDate() + diasTolerancia);
    return data;
}

async function atualizarPagamentoComoAtrasado(pagamento, parametro, dataHojeUTC) {
    pagamento.situacao = SituacaoPagamentoEnum.ATRASADO;

    const dataComTolerancia = calcularDataComTolerancia(pagamento.dataVencimento, parametro.diasToleranciaMulta);

    if (dataComTolerancia < dataHojeUTC) {
        const diasAtraso = calcularDiferencaDias(dataHojeUTC.getTime(), dataComTolerancia.getTime());
        pagamento.multa = parametro.valorMulta * diasAtraso;
    }

    await pagamento.save();
}

async function processarPagamentosDaAssociacao(parametro, dataHojeUTC) {
    const pagamentos = await Pagamento.findAll({
        include: [{
            model: Usuario,
            attributes: ['id', 'associacaoId'],
            where: { associacaoId: parametro.associacaoId }
        }],
        where: {
            situacao: { [Op.or]: [SituacaoPagamentoEnum.ABERTO, SituacaoPagamentoEnum.ATRASADO] },
            dataVencimento: { [Op.lt]: dataHojeUTC }
        }
    });

    for (const pagamento of pagamentos) {
        await atualizarPagamentoComoAtrasado(pagamento, parametro, dataHojeUTC);
    }
}

async function verificarPagamentosAtrasados() {
    try {
        const parametros = await Parametro.findAll();
        const dataHojeUTC = new Date(convertDateToUTC(new Date()));

        for (const parametro of parametros) {
            await processarPagamentosDaAssociacao(parametro, dataHojeUTC);
        }

        console.log('Pagamentos atrasados verificados!');
    } catch (error) {
        console.error('Erro ao verificar pagamentos atrasados:', error);
    }
}

export default verificarPagamentosAtrasados;
