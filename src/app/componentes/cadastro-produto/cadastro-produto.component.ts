import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.scss',
})
export class CadastroProdutoComponent {
  form: FormGroup;

  constructor(private produtoService: ProdutoService) {
    this.form = new FormGroup({
      nome: new FormControl(''),
      taxaAnual: new FormControl(''),
      prazoMaximo: new FormControl(''),
    });
  }

  salvar() {
    this.produtoService.salvar(this.form.value).subscribe({
      next: (produto) => {
        console.log('Produto salvo com sucesso', produto);
        this.form.reset();
      },
      error: (err) => {
        console.error('Erro ao salvar produto', err);
      },
    });
  }

}
