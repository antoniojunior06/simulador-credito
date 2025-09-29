import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MoedaDinamicaDirective } from '../../../diretivas/moeda-dinamica.directive';
import { MensagemComponent } from '../../../shared/mensagem/mensagem.component';
import { ErroFormComponent } from '../../../shared/erro-form/erro-form.component';
import { ProdutoService } from '../../../service/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MoedaDinamicaDirective,
    RouterLink,
    MensagemComponent,
    ErroFormComponent
],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.scss',
})
export class CadastroProdutoComponent implements OnInit {
  @ViewChild('mensagem') mensagem!: MensagemComponent;
  form!: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarProduto();
  }

  inicializarFormulario() {
    this.form = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      taxaAnual: new FormControl('', [
        Validators.required,
        Validators.min(0.001),
      ]),
      prazoMaximo: new FormControl('', [
        Validators.required,
        Validators.min(0.001),
      ]),
    });
  }

  carregarProduto() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.produtoService.buscarPorId(parseInt(id)).subscribe((produto) => {
        this.form.patchValue(produto);
      });
    }
  }

  salvar() {
    const novoProduto = this.form.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    novoProduto.id = id ? parseInt(id) : null;

    if (id) {
      this.produtoService.editar(novoProduto).subscribe(() => {
        this.form.reset();
        this.router.navigateByUrl('/listaProdutos');
      });
    } else {
      this.produtoService.salvar(novoProduto).subscribe(() => {
        this.form.reset();
        this.mensagem.mostrar("Cadastro efetuado com sucesso!", "sucesso");
      });
    }
  }

  isInputZerado(el: HTMLInputElement): boolean {
    // pega o valor exibido no input e remove tudo que não é número
    const numericValue = el.value.replace(/\D/g, '');
    return !numericValue || parseInt(numericValue, 10) === 0;
  }

}
