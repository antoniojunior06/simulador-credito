import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appMoedaDinamica]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MoedaDinamicaDirective),
      multi: true
    }
  ]
})
export class MoedaDinamicaDirective implements ControlValueAccessor {

  private onChange!: (value: number) => void;
  private onTouched!: () => void;
  private valorNumerico: string = ''; // mantém apenas números digitados

  constructor(private el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {}

  writeValue(value: number | null): void {
    if (value != null && value !== 0) {
      this.valorNumerico = Math.round(value * 100).toString();
      this.el.nativeElement.value = this.formatarMoeda(value);
      this.renderer.removeClass(this.el.nativeElement, 'input-zero');
    } else {
      this.valorNumerico = '';
      this.el.nativeElement.value = ''; // deixa em branco
      this.renderer.addClass(this.el.nativeElement, 'input-zero');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target.value;
    this.valorNumerico = input.replace(/\D/g, '');

    const valorDecimal = this.valorNumerico ? parseInt(this.valorNumerico, 10) / 100 : 0;

    this.onChange(valorDecimal);

    event.target.value = valorDecimal > 0 ? this.formatarMoeda(valorDecimal) : '';

    if (valorDecimal === 0) {
      this.renderer.addClass(this.el.nativeElement, 'input-zero');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'input-zero');
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.onTouched) this.onTouched();
  }

  private formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}
