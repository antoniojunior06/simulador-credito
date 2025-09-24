import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-lista-atividades',
  standalone: true,
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './lista-atividades.component.html',
  styleUrl: './lista-atividades.component.scss'
})
export class ListaAtividadesComponent {

  constructor(public authService: AuthService) {}
}
