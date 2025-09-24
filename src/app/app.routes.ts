import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListaAtividadesComponent } from './componentes/lista-atividades/lista-atividades.component';
import { CadastroProdutoComponent } from './componentes/cadastro-produto/cadastro-produto.component';
import { ListaProdutosComponent } from './componentes/lista-produtos/lista-produtos.component';
import { SimuladorComponent } from './componentes/simulador/simulador.component';
import { LoginComponent } from './componentes/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full',
  // },

  {
    path: '',
    redirectTo: '/listaAtividades',
    pathMatch: 'full',
  },
  {
    path: 'listaAtividades',
    component: ListaAtividadesComponent,
  },
  {
    path: 'cadastroProduto',
    component: CadastroProdutoComponent,
    // canActivate: [adminGuard],
  },
  {
    path: 'listaProdutos',
    component: ListaProdutosComponent,
    // canActivate: [adminGuard],
  },
  {
    path: 'simulador',
    component: SimuladorComponent,
    // canActivate: [authGuard],
  },
];
