import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { Produto } from '../../../types/produto';
import { ProdutoService } from '../../../service/produto.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MoedaDinamicaDirective } from '../../../diretivas/moeda-dinamica.directive';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SimulacaoService } from '../../../service/simulacao.service';
import { ResultadoSimulacao } from '../../../types/resultado-simulacao';
import { MatDialog } from '@angular/material/dialog';
import { MensagemComponent } from '../../../shared/mensagem/mensagem.component';
import { ErroFormComponent } from '../../../shared/erro-form/erro-form.component';
import { ResultadoSimulacaoComponent } from '../resultado-simulacao/resultado-simulacao.component';

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
    RouterLink,
    MensagemComponent,
    ErroFormComponent
],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.scss',
})
export class SimuladorComponent implements OnInit {
  listaProdutos$: Observable<Produto[]> = of();
  form!: FormGroup;
  resultado!: ResultadoSimulacao;
  produto!: Produto
  @ViewChild('mensagem') mensagem!: MensagemComponent;
  prazoMaximoValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (this.produto && control.value > this.produto.prazoMaximo) {
    return {
      prazoMaximo: {
        max: this.produto.prazoMaximo,
        atual: control.value
      }
    };
  }
  return null;
};

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
      prazo: new FormControl('', [Validators.required, this.prazoMaximoValidator]),
    });
  }

  listar(): void {
    this.listaProdutos$ = this.produtoService.listar();
  }

  simular() {
    const simulacao = this.form.value;
    this.simulacaoService.simular(simulacao).subscribe(resultado => {
      if (resultado.prazo > resultado.produto.prazoMaximo) {
        this.mensagem.mostrar(`Prazo máximo: ${resultado.produto.prazoMaximo} meses.`, 'erro');
        return;
      }

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

  onProdutoChange(produto: Produto) {
    this.produto = produto; // opcional, se quiser usar em outros lugares
    this.form.get('prazo')?.updateValueAndValidity();
    console.log(this.produto.prazoMaximo);
}

}
