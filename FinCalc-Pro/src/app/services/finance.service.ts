export type SistemaAmortizacao = 'SAC' | 'PRICE';

export interface FinanciamentoInput {
  valorImovel: number;
  entrada: number;
  jurosAnual: number; // em %
  prazoAnos: number;
  sistema: SistemaAmortizacao;
}

export interface FinanciamentoResultado {
  parcelaInicial: number;
  parcelaFinal: number;
  valorTotalPago: number;
  totalJuros: number;
}

export function calcularFinanciamento(input: FinanciamentoInput): FinanciamentoResultado {
  const pv = Math.max(0, input.valorImovel - input.entrada);
  const n = Math.round(input.prazoAnos * 12);
  const i = input.jurosAnual / 100 / 12;

  if (pv <= 0 || n <= 0 || i < 0) {
    return { parcelaInicial: 0, parcelaFinal: 0, valorTotalPago: 0, totalJuros: 0 };
  }

  if (input.sistema === 'PRICE') {
    const p = pv * i / (1 - Math.pow(1 + i, -n));
    const valorTotalPago = p * n;
    const totalJuros = valorTotalPago - pv;
    return { parcelaInicial: p, parcelaFinal: p, valorTotalPago, totalJuros };
  }

  // SAC
  const amortizacao = pv / n;
  let saldo = pv;
  let valorTotalPago = 0;
  let parcelaInicial = 0;
  let parcelaFinal = 0;

  for (let k = 1; k <= n; k++) {
    const jurosMes = saldo * i;
    const parcela = amortizacao + jurosMes;
    if (k === 1) parcelaInicial = parcela;
    if (k === n) parcelaFinal = parcela;
    valorTotalPago += parcela;
    saldo -= amortizacao;
  }

  const totalJuros = valorTotalPago - pv;
  return { parcelaInicial, parcelaFinal, valorTotalPago, totalJuros };
}

export interface InvestimentoInput {
  valorInicial: number;
  tipo: 'CDB' | 'Tesouro Direto';
  rentabilidade: number; // % do CDI (CDB) ou taxa fixa aa (Tesouro)
  prazoMeses: number;
  cdiAnual: number; // % aa
}

export interface InvestimentoResultado {
  valorBruto: number;
  impostoRenda: number;
  valorLiquido: number;
  rendimentoTotal: number;
}

export function calcularInvestimento(input: InvestimentoInput): InvestimentoResultado {
  const { valorInicial, tipo, rentabilidade, prazoMeses, cdiAnual } = input;
  if (valorInicial <= 0 || prazoMeses <= 0) {
    return { valorBruto: 0, impostoRenda: 0, valorLiquido: 0, rendimentoTotal: 0 };
  }

  let taxaAnual = 0;
  if (tipo === 'CDB') {
    taxaAnual = (cdiAnual / 100) * (rentabilidade / 100);
  } else {
    taxaAnual = rentabilidade / 100;
  }

  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
  const valorBruto = valorInicial * Math.pow(1 + taxaMensal, prazoMeses);
  const ganho = valorBruto - valorInicial;

  const aliquota = obterAliquotaIR(prazoMeses);
  const impostoRenda = ganho * aliquota;
  const valorLiquido = valorBruto - impostoRenda;
  const rendimentoTotal = valorLiquido - valorInicial;

  return { valorBruto, impostoRenda, valorLiquido, rendimentoTotal };
}

export function obterAliquotaIR(prazoMeses: number): number {
  if (prazoMeses <= 6) return 0.225; // até 6 meses
  if (prazoMeses <= 12) return 0.20; // 6 a 12
  if (prazoMeses <= 24) return 0.175; // 12 a 24
  return 0.15; // acima de 24
}

export function formatCurrencyBR(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}