import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMask } from '../../shared/currency-mask';
import { calcularFinanciamento, formatCurrencyBR, SistemaAmortizacao } from '../../services/finance.service';
import { TaxasService } from '../../services/taxas.service';

@Component({
  standalone: true,
  selector: 'app-financiamento',
  imports: [CommonModule, FormsModule, CurrencyMask],
  templateUrl: './financiamento.component.html',
  styleUrl: './financiamento.component.css'
})
export class FinanciamentoComponent implements OnInit {
  private taxasService = inject(TaxasService);

  valorImovel = 0;
  entrada = 0;
  jurosAnual = 0;
  prazoAnos = 0;
  sistema: SistemaAmortizacao = 'SAC';
  bancoSelecionado = '';

  bancos = [
    { nome: 'Caixa Econômica Federal', taxa: 9.99, entradaMinima: 20 },
    { nome: 'Banco do Brasil', taxa: 10.49, entradaMinima: 20 },
    { nome: 'Itaú', taxa: 10.89, entradaMinima: 30 },
    { nome: 'Santander', taxa: 10.99, entradaMinima: 30 },
    { nome: 'Bradesco', taxa: 11.19, entradaMinima: 30 },
    { nome: 'Outro / Personalizar', taxa: 0, entradaMinima: 0 }
  ];

  taxaSugerida = 0;
  carregandoTaxas = true;
  entradaMinimaRecomendada = 0;
  percentualEntradaMinima = 0;

  resultado: { parcelaInicial: string; parcelaFinal: string; valorTotalPago: string; totalJuros: string } | null = null;

  ngOnInit() {
    this.taxasService.getTaxas().subscribe({
      next: (taxas) => {
        this.taxaSugerida = taxas.financiamentoImobiliario;
        this.jurosAnual = taxas.financiamentoImobiliario;
        this.carregandoTaxas = false;
      },
      error: () => {
        this.taxaSugerida = 10.5;
        this.jurosAnual = 10.5;
        this.carregandoTaxas = false;
      }
    });
  }

  aplicarTaxaSugerida() {
    this.jurosAnual = this.taxaSugerida;
  }

  onBancoChange() {
    const banco = this.bancos.find(b => b.nome === this.bancoSelecionado);
    if (banco) {
      if (banco.taxa > 0) {
        this.jurosAnual = banco.taxa;
      }
      if (banco.entradaMinima > 0 && this.valorImovel > 0) {
        this.percentualEntradaMinima = banco.entradaMinima;
        this.entradaMinimaRecomendada = this.valorImovel * (banco.entradaMinima / 100);
        // Sempre aplica a entrada mínima do banco selecionado
        this.entrada = this.entradaMinimaRecomendada;
      } else {
        this.percentualEntradaMinima = banco.entradaMinima || 0;
        this.entradaMinimaRecomendada = 0;
      }
    }
  }

  onValorImovelChange() {
    if (this.bancoSelecionado && this.valorImovel > 0) {
      const banco = this.bancos.find(b => b.nome === this.bancoSelecionado);
      if (banco && banco.entradaMinima > 0) {
        this.entradaMinimaRecomendada = this.valorImovel * (banco.entradaMinima / 100);
        // Só atualiza a entrada se for menor que o mínimo
        if (this.entrada < this.entradaMinimaRecomendada) {
          this.entrada = this.entradaMinimaRecomendada;
        }
      }
    }
  }

  simular() {
    const res = calcularFinanciamento({
      valorImovel: this.valorImovel,
      entrada: this.entrada,
      jurosAnual: this.jurosAnual,
      prazoAnos: this.prazoAnos,
      sistema: this.sistema,
    });
    this.resultado = {
      parcelaInicial: formatCurrencyBR(res.parcelaInicial),
      parcelaFinal: formatCurrencyBR(res.parcelaFinal),
      valorTotalPago: formatCurrencyBR(res.valorTotalPago),
      totalJuros: formatCurrencyBR(res.totalJuros)
    };
  }
}
