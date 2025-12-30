import { Directive, ElementRef, Host, HostListener, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true
})
export class CurrencyMask implements OnInit {
  private isUpdating = false;

  constructor(private el: ElementRef<HTMLInputElement>, @Host() private ngModel: NgModel) {}

  ngOnInit() {
    const initialValue = this.ngModel.control?.value;
    if (initialValue != null && typeof initialValue === 'number') {
      setTimeout(() => {
        this.el.nativeElement.value = this.formatDisplay(initialValue);
      });
    }
  }

  @HostListener('focus')
  onFocus() {
    // Seleciona todo o texto ao focar
    setTimeout(() => {
      this.el.nativeElement.select();
    }, 0);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const key = event.key;
    
    // Permitir: backspace, delete, tab, escape, enter, setas
    if (['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key)) {
      return;
    }
    
    // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (event.ctrlKey || event.metaKey) {
      return;
    }
    
    // Bloquear se não for número
    if (!/^\d$/.test(key)) {
      event.preventDefault();
      return;
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (this.isUpdating) {
      return;
    }

    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Extrair apenas dígitos
    const digits = value.replace(/\D/g, '');
    
    // Converter para centavos
    const cents = parseInt(digits || '0', 10);
    const reais = cents / 100;
    
    this.isUpdating = true;
    
    // Atualizar o modelo com o valor numérico
    this.ngModel.control?.setValue(reais, { emitEvent: false });
    
    // Formatar e mostrar no input
    input.value = this.formatDisplay(reais);
    
    // Posicionar cursor no final
    setTimeout(() => {
      input.setSelectionRange(input.value.length, input.value.length);
    }, 0);
    
    this.isUpdating = false;
  }

  @HostListener('blur')
  onBlur() {
    const value = this.ngModel.control?.value as number;
    if (value != null) {
      this.el.nativeElement.value = this.formatDisplay(value);
    }
  }

  private formatDisplay(value: number): string {
    if (value == null || isNaN(value)) {
      return '0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
}
