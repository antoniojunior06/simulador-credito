import { Component, Inject, Input } from '@angular/core';
import { ResultadoSimulacao } from '../../types/resultado-simulacao';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-resultado-simulacao',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  templateUrl: './resultado-simulacao.component.html',
  styleUrl: './resultado-simulacao.component.scss'
})
export class ResultadoSimulacaoComponent {

  //@Input() resultado!: ResultadoSimulacao;
  displayedColumns: string[] = ['mes', 'juros', 'amortizacao', 'saldoDevedor'];

  constructor(
    // public dialogRef: MatDialogRef<ResultadoSimulacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public resultado: ResultadoSimulacao
  ) {}
}
