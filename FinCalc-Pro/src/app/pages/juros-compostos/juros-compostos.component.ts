import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyMask } from '../../shared/currency-mask';

interface ResultadoJurosCompostos {
  valorFinal: number;
  jurosGanhos: number;
  aporteTotal: number;
  evolucaoMensal: { mes: number; saldo: number; juros: number }[];
}

@Component({
  standalone: true,
  selector: 'app-juros-compostos',
  imports: [CommonModule, FormsModule, CurrencyMask],
  templateUrl: './juros-compostos.component.html',
  styleUrl: './juros-compostos.component.css'
})
export class JurosCompostosComponent {
  valorInicial = 0;
  aporteMensal = 0;
  taxaAnual = 0;
  periodoMeses = 0;

  resultado: ResultadoJurosCompostos | null = null;

  calcular() {
    if (this.valorInicial < 0 || this.aporteMensal < 0 || this.taxaAnual <= 0 || this.periodoMeses <= 0) {
      return;
    }

    const taxaMensal = Math.pow(1 + this.taxaAnual / 100, 1 / 12) - 1;
    let saldo = this.valorInicial;
    const evolucao: { mes: number; saldo: number; juros: number }[] = [];

    for (let mes = 1; mes <= this.periodoMeses; mes++) {
      const jurosDoMes = saldo * taxaMensal;
      saldo += jurosDoMes + this.aporteMensal;
      
      // Guarda evolução (apenas alguns pontos para não sobrecarregar)
      if (mes === 1 || mes % 12 === 0 || mes === this.periodoMeses) {
        evolucao.push({
          mes,
          saldo: Math.round(saldo * 100) / 100,
          juros: Math.round(jurosDoMes * 100) / 100
        });
      }
    }

    const aporteTotal = this.valorInicial + (this.aporteMensal * this.periodoMeses);
    const jurosGanhos = saldo - aporteTotal;

    this.resultado = {
      valorFinal: Math.round(saldo * 100) / 100,
      jurosGanhos: Math.round(jurosGanhos * 100) / 100,
      aporteTotal: Math.round(aporteTotal * 100) / 100,
      evolucaoMensal: evolucao
    };
  }

  formatCurrency(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
}
