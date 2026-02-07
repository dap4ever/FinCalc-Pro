import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CaixaLinha {
  nome: string;
  descricao: string;
  taxaMin: number;
  taxaMax: number;
  indexador: string;
}

@Component({
  selector: 'app-caixa-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caixa-info-modal.component.html'
})
export class CaixaInfoModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() selectLinhaEvent = new EventEmitter<{ nome: string; taxa: number }>();

  linhas: CaixaLinha[] = [
    {
      nome: 'TR + Pós-fixado',
      descricao: 'Sistema Financeiro da Habitação (SFH) - Imóveis até R$ 1,5 mi',
      taxaMin: 10.99,
      taxaMax: 12.00,
      indexador: 'TR (Taxa Referencial)'
    },
    {
      nome: 'Poupança + Pós-fixado',
      descricao: 'Atrelado à rentabilidade da Caderneta de Poupança',
      taxaMin: 4.12,
      taxaMax: 5.06,
      indexador: 'Poupança + Taxa Fixa'
    },
    {
      nome: 'Minha Casa, Minha Vida (MCMV)',
      descricao: 'Programa social com taxas reduzidas e sem indexação recente',
      taxaMin: 4.00,
      taxaMax: 10.50,
      indexador: 'Fixo (Segundo faixa de renda)'
    }
  ];

  onClose(): void {
    this.close.emit();
  }

  selectLinha(linha: CaixaLinha): void {
    const taxaMedia = (linha.taxaMin + linha.taxaMax) / 2;
    this.selectLinhaEvent.emit({
      nome: linha.nome,
      taxa: taxaMedia
    });
    this.onClose();
  }
}
