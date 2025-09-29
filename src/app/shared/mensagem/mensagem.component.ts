import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.scss',
  animations: [
      trigger('fadeOut', [
        state('void', style({ opacity: 0 })),
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('600ms ease-out', style({ opacity: 0 }))
        ])
      ])
    ],
})
export class MensagemComponent {

  tipo: string | null = null;
  mensagem: string | null = null;

  mostrar(m: string, tipo: 'sucesso' | 'erro' = 'sucesso') {
    this.mensagem = m;
    this.tipo = tipo;
    setTimeout(() => this.mensagem = null, 3000); // desaparece em 3s
  }
}
