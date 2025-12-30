import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMask } from '../../shared/currency-mask';
import { calcularInvestimento, formatCurrencyBR } from '../../services/finance.service';
import { TaxasService } from '../../services/taxas.service';

@Component({
  standalone: true,
  selector: 'app-investimentos',
  imports: [CommonModule, FormsModule, CurrencyMask],
  templateUrl: './investimentos.component.html',
  styleUrl: './investimentos.component.css'
})
export class InvestimentosComponent implements OnInit {
  private taxasService = inject(TaxasService);

  valorInicial = 0;
  tipo: 'CDB' | 'Tesouro Direto' = 'CDB';
  rentabilidade = 0;
  prazoMeses = 0;
  cdiAnual = 0;

  cdiAtual = 0;
  carregandoTaxas = true;

  resultado: { valorBruto: string; impostoRenda: string; valorLiquido: string; rendimentoTotal: string } | null = null;

  ngOnInit() {
    this.taxasService.getTaxas().subscribe({
      next: (taxas) => {
        this.cdiAtual = taxas.cdi;
        this.cdiAnual = taxas.cdi;
        this.carregandoTaxas = false;
      },
      error: () => {
        this.cdiAtual = 10.65;
        this.cdiAnual = 10.65;
        this.carregandoTaxas = false;
      }
    });
  }

  aplicarCdiAtual() {
    this.cdiAnual = this.cdiAtual;
  }

  simular() {
    const res = calcularInvestimento({
      valorInicial: this.valorInicial,
      tipo: this.tipo,
      rentabilidade: this.rentabilidade,
      prazoMeses: this.prazoMeses,
      cdiAnual: this.cdiAnual
    });
    this.resultado = {
      valorBruto: formatCurrencyBR(res.valorBruto),
      impostoRenda: formatCurrencyBR(res.impostoRenda),
      valorLiquido: formatCurrencyBR(res.valorLiquido),
      rendimentoTotal: formatCurrencyBR(res.rendimentoTotal)
    };
  }
}
