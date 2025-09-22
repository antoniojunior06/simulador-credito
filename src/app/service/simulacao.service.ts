import { Parcela } from './../types/resultado-simulacao';
import { Simulacao } from './../types/simulacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ResultadoSimulacao } from '../types/resultado-simulacao';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoService {

  private readonly api = 'http://localhost:3000/simulacoes'

  constructor(private httpClient: HttpClient) { }

  simular(simulacao: Simulacao): Observable<ResultadoSimulacao> {
    return this.httpClient.post<Simulacao>(this.api, simulacao)
    .pipe(
      map(simulacao => this.calcularResultado(simulacao)),
      tap(simulacao => console.log(simulacao))
    );
  }

  private calcularResultado(simulacao: Simulacao): ResultadoSimulacao {
    const valor = simulacao.valor;
    const prazo = simulacao.prazo;
    const taxaAnual = simulacao.produto.taxaAnual / 100;

    // taxa efetiva mensal
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

    // parcela fixa
    const pmt = (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -prazo));
    console.log("pmt", pmt)

    // memória de cálculo
    let saldo = valor;
    const memoria: Parcela[] = [];

    for (let mes = 1; mes <= prazo; mes++) {
      const juros = saldo * taxaMensal;
      const amortizacao = pmt - juros;
      saldo -= amortizacao;

      memoria.push({
        mes,
        juros,
        amortizacao,
        saldoDevedor: saldo > 0 ? saldo : 0
      });
    }

    return {
      produto: simulacao.produto,
      valor: simulacao.valor,
      prazo: simulacao.prazo,
      taxaEfetivaMensal: taxaMensal * 100,
      valorTotalComJuros: pmt * prazo,
      valorParcelaMensal: pmt,
      memoriaCalculo: memoria
    }
  }
}
