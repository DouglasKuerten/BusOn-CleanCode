import Parametro from '../../models/Parametro.js';
import Usuario from '../../models/usuario.js';
import Pagamento from '../../models/Pagamento.js';
import { Op } from 'sequelize';
import { convertDateToUTC } from '../../utils/converterDateToUtc.js';

async function verificarPagamentosAtrasados() {
    try {
        const parametrosPagamento = await Parametro.findAll();
        for (const parametroPagamento of parametrosPagamento) {

            const pagamentos = await Pagamento.findAll({
                include: [{
                    model: Usuario,
                    attributes: ['id', 'associacaoId'],
                    where: { associacaoId: parametroPagamento.dataValues.associacaoId }
                }],
                where: {
                    situacao: {
                        [Op.or]: ['ABERTO', 'ATRASADO']
                    },
                    dataVencimento: {
                        [Op.lt]: convertDateToUTC(new Date())
                    }
                }
            });

            for (const pagamento of pagamentos) {
                let diasToleranciaMulta = parametroPagamento.dataValues.diasToleranciaMulta;
                let valorMultaPorDia = parametroPagamento.dataValues.valorMulta;
                let dataVencimento = pagamento.dataValues.dataVencimento;
                let dataComToleranciaDeMulta = dataVencimento.setDate(dataVencimento.getDate() + diasToleranciaMulta);

                if (dataVencimento < convertDateToUTC(new Date())) {
                    pagamento.situacao = 'ATRASADO';
                    if (dataComToleranciaDeMulta < convertDateToUTC(new Date())) {
                        pagamento.multa = valorMultaPorDia * calcularDiferencaDias(new Date().getTime(), new Date(dataComToleranciaDeMulta).getTime());
                    }
                    await pagamento.save();
                }
            }
        }
        console.log('Pagamentos atrasados verificados! ');
    } catch (error) {
        console.error(error);
        console.log('Erro ao verificar pagamentos atrasados');
    }
};

function calcularDiferencaDias(dataInicial, dataFinal) {
    const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
    const diferencaEmMilissegundos = dataInicial - dataFinal;
    const diferencaEmDias = Math.round(diferencaEmMilissegundos / umDiaEmMilissegundos);
    return diferencaEmDias;
}

export default async () => {
    await verificarPagamentosAtrasados();
}
