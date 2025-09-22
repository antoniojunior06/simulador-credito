import { Produto } from "./produto";

export interface Parcela {
  mes: number;
  juros: number;
  amortizacao: number;
  saldoDevedor: number;
}

export interface ResultadoSimulacao {
  produto: Produto;
  valor: number;
  prazo: number;
  taxaEfetivaMensal: number;
  valorTotalComJuros: number;
  valorParcelaMensal: number;
  memoriaCalculo: Parcela[];
}
