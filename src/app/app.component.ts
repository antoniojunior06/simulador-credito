import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./componentes/header/header.component";
import { ListaAtividadesComponent } from "./componentes/lista-atividades/lista-atividades.component";
import { CadastroProdutoComponent } from "./componentes/cadastro-produto/cadastro-produto.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ListaAtividadesComponent, CadastroProdutoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simulador-cred';
}
