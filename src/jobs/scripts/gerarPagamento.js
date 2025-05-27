import Parametro from '../../models/Parametro.js';
import Usuario from '../../models/Usuario.js';
import Pagamento from '../../models/Pagamento.js';
import { convertDateToUTC } from '../../utils/converterDateToUtc.js';
import SituacaoPagamentoEnum from '../../enum/SituacaoPagamentoEnum.js';
import TipoPagamentoEnum from '../../enum/TipoPagamentoEnum.js';
import AtivoInativoEnum from '../../enum/AtivoInativoEnum.js';
import SimNaoEnum from '../../enum/SimNaoEnum.js';

async function buscarParametrosComPagamentoAutomatico() {
  return await Parametro.findAll({
    where: { gerarPagamentosAutomatico: SimNaoEnum.SIM },
  });
}

function calcularValorPagamento(diasUso, parametro) {
  const key = `valor${diasUso}`;
  return parametro[key] ?? 0;
}

function calcularDataVencimento(diaVencimento) {
  const hojeUtc = new Date(convertDateToUTC(new Date()));
  hojeUtc.setDate(diaVencimento);
  return hojeUtc;
}

async function gerarPagamentoParaUsuario(usuario, parametro) {
  const diasUso = usuario.diasUsoTransporte?.length || 0;
  const valor = calcularValorPagamento(diasUso, parametro);
  const dataVencimento = calcularDataVencimento(parametro.diaVencimento);

  const pagamento = {
    txId: null,
    pixCopiaCola: null,
    usuarioId: usuario.id,
    tipo: TipoPagamentoEnum.PIX,
    valor,
    multa: 0,
    dataVencimento,
    dataPagamento: null,
    situacao: SituacaoPagamentoEnum.ABERTO,
  };

  return await Pagamento.create(pagamento);
}

async function gerarPagamentosParaAssociacao(parametro) {
  const usuarios = await Usuario.findAll({
    where: {
      associacaoId: parametro.associacaoId,
      situacao: AtivoInativoEnum.ATIVO,
    },
  });

  for (const usuario of usuarios) {
    await gerarPagamentoParaUsuario(usuario, parametro);
  }
}

async function gerarPagamentosMensais() {
  try {
    const parametros = await buscarParametrosComPagamentoAutomatico();

    for (const parametro of parametros) {
      await gerarPagamentosParaAssociacao(parametro);
    }

    console.log('Pagamentos gerados para todos os usuários!');
  } catch (error) {
    console.error('Erro ao criar novo pagamento:', error);
  }
}

export default gerarPagamentosMensais;
