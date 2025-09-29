import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ResultadoSimulacao } from '../../../types/resultado-simulacao';

@Component({
  selector: 'app-resultado-simulacao',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  templateUrl: './resultado-simulacao.component.html',
  styleUrl: './resultado-simulacao.component.scss'
})
export class ResultadoSimulacaoComponent {

  displayedColumns: string[] = ['mes', 'juros', 'amortizacao', 'saldoDevedor'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public resultado: ResultadoSimulacao
  ) {}
}
