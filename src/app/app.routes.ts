import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListaAtividadesComponent } from './componentes/lista-atividades/lista-atividades.component';
import { ListaProdutosComponent } from './features/produto/lista-produtos/lista-produtos.component';
import { SimuladorComponent } from './features/simulador/simulador/simulador.component';
import { LoginComponent } from './componentes/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard} from './guards/auth.guard';
import { CadastroProdutoComponent } from './features/produto/cadastro-produto/cadastro-produto.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'listaAtividades',
    component: ListaAtividadesComponent,
  },
  {
    path: 'cadastroProduto',
    component: CadastroProdutoComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'cadastroProduto/:id',
    component: CadastroProdutoComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'listaProdutos',
    component: ListaProdutosComponent,
    canActivate: [authGuard]
  },
  {
    path: 'simulador',
    component: SimuladorComponent,
    canActivate: [authGuard]
  },
];
