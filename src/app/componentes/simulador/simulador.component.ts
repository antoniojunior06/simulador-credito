import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, of } from 'rxjs';
import { Produto } from '../../types/produto';
import { ProdutoService } from '../../service/produto.service';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, MatFormFieldModule, AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.scss',
})
export class SimuladorComponent implements OnInit {

  listaProdutos$: Observable<Produto[]> = of();

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.listaProdutos$ = this.produtoService.listar();
  }
}
