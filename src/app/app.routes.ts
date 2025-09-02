import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListaAtividadesComponent } from './componentes/lista-atividades/lista-atividades.component';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import { ListaProdutosComponent } from './componentes/lista-produtos/lista-produtos.component';
import { SimuladorComponent } from './componentes/simulador/simulador.component';

export const routes: Routes = [
  {
    path: 'listaAtividades',
    component: ListaAtividadesComponent
  },
  {
    path: 'cadastroProduto',
    component: CadastroProdutoComponent
  },
  {
    path: 'cadastro-produto/:id',
    component: CadastroProdutoComponent
  },
  {
    path: 'listaProdutos',
    component: ListaProdutosComponent
  },
  {
    path: 'simulador',
    component: SimuladorComponent
  }
];
