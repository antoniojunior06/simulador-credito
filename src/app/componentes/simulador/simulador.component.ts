import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { Produto } from '../../types/produto';
import { ProdutoService } from '../../service/produto.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MoedaDinamicaDirective } from '../../diretivas/moeda-dinamica.directive';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SimulacaoService } from '../../service/simulacao.service';
import { ResultadoSimulacao } from '../../types/resultado-simulacao';
import { Simulacao } from '../../types/simulacao';
import { ResultadoSimulacaoComponent } from "../resultado-simulacao/resultado-simulacao.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MoedaDinamicaDirective,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.scss',
})
export class SimuladorComponent implements OnInit {
  listaProdutos$: Observable<Produto[]> = of();
  form!: FormGroup;
  resultado!: ResultadoSimulacao;

  constructor(
    private produtoService: ProdutoService,
    private simulacaoService: SimulacaoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listar();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.form = new FormGroup({
      id: new FormControl(null),
      produto: new FormControl(null, Validators.required),
      valor: new FormControl('', [Validators.required, Validators.min(0.001)]),
      prazo: new FormControl('', Validators.required),
    });
  }

  listar(): void {
    this.listaProdutos$ = this.produtoService.listar();
  }

  simular() {
    const simulacao = this.form.value;
    this.simulacaoService.simular(simulacao).subscribe(resultado => {
      // this.resultado = resultado;
      this.form.reset();
      this.openDialog(resultado);
    });
  }

  isInputZerado(el: HTMLInputElement): boolean {
    // pega o valor exibido no input e remove tudo que não é número
    const numericValue = el.value.replace(/\D/g, '');
    return !numericValue || parseInt(numericValue, 10) === 0;
  }

  openDialog(resultado: ResultadoSimulacao) {
    this.dialog.open(ResultadoSimulacaoComponent, {
      width: '500px',
      maxHeight: '80vh',
      data: resultado
    });
  }
}
