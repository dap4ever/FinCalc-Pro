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
  dropdownAberto = false;

  bancos = [
    { nome: 'Caixa Econômica Federal', taxa: 9.99, entradaMinima: 20, logo: 'https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/64x64/32570ebd52d6590af587d4d45c6fecea' },
    { nome: 'Banco do Brasil', taxa: 10.49, entradaMinima: 20, logo: 'https://yt3.googleusercontent.com/YoY6PQUzk6UXJEW8sTYs8zf_TfPLHNLSim65mswp_w5CX0jYgtl_le41QPRwoI1Hyj4OM2q_=s900-c-k-c0x00ffffff-no-rj' },
    { nome: 'Itaú', taxa: 10.89, entradaMinima: 30, logo: 'https://play-lh.googleusercontent.com/gRcutACE4XkEHmxcbUdOehxpTbp_LjmwJ6qIEbqfD34oh9feTNhTnlDgf97HEZ9eGKY' },
    { nome: 'Santander', taxa: 10.99, entradaMinima: 30, logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmQKVC9hFswtIttMxyOpxiUyXGMSKgxDpfg&s' },
    { nome: 'Bradesco', taxa: 11.19, entradaMinima: 30, logo: 'https://pbs.twimg.com/profile_images/1737158472225927168/zyASghk-.jpg' },
    { nome: 'Outro / Personalizar', taxa: 0, entradaMinima: 0, logo: '' }
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

  getBancoSelecionado() {
    return this.bancos.find(b => b.nome === this.bancoSelecionado);
  }

  toggleDropdown() {
    this.dropdownAberto = !this.dropdownAberto;
  }

  selecionarBanco(nomeBanco: string) {
    this.bancoSelecionado = nomeBanco;
    this.dropdownAberto = false;
    this.onBancoChange();
  }

  onBancoChange() {
    const banco = this.bancos.find(b => b.nome === this.bancoSelecionado);
    if (banco) {
      if (banco.taxa > 0) {
        this.jurosAnual = banco.taxa;
      }
      if (banco.entradaMinima > 0 && this.valorImovel > 0) {
        this.percentualEntradaMinima = banco.entradaMinima;
        this.entradaMinimaRecomendada = Math.round(this.valorImovel * (banco.entradaMinima / 100));
        // Forçar atualização com pequeno delay para a diretiva processar
        setTimeout(() => {
          this.entrada = 0;
          setTimeout(() => {
            this.entrada = this.entradaMinimaRecomendada;
          }, 10);
        }, 10);
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
        this.entradaMinimaRecomendada = Math.round(this.valorImovel * (banco.entradaMinima / 100));
        // Só atualiza a entrada se for menor que o mínimo
        if (this.entrada < this.entradaMinimaRecomendada) {
          setTimeout(() => {
            this.entrada = 0;
            setTimeout(() => {
              this.entrada = this.entradaMinimaRecomendada;
            }, 10);
          }, 10);
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
