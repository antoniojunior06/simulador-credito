import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-erro-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './erro-form.component.html',
  styleUrl: './erro-form.component.scss',
  exportAs: 'erroForm'
})
export class ErroFormComponent {

  @Input() form!: FormGroup
  @Input() campo!: string

  get control(): FormControl {
    const control = this.form.get(this.campo);
    if(!control) {
      throw new Error(`O campo ${this.campo} não existe no formulário.`);
    }
    return control as FormControl;
  }

  get invalido(): boolean {
    return !!this.control && this.control.invalid && this.control.touched;
  }
}
