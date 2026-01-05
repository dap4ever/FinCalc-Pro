import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  artigos = [
    {
      id: 1,
      titulo: 'Como Escolher o Melhor Sistema de Amortização para Seu Financiamento',
      resumo: 'Entenda as diferenças entre SAC e Price e descubra qual se adequa melhor ao seu perfil financeiro.',
      data: '2 de Janeiro, 2026',
      categoria: 'Financiamento',
      tempo: '8 min de leitura'
    },
    {
      id: 2,
      titulo: 'Reserva de Emergência: Por Que e Como Construir a Sua',
      resumo: 'Aprenda a importância de ter uma reserva financeira e as melhores opções de investimento para mantê-la.',
      data: '28 de Dezembro, 2025',
      categoria: 'Investimentos',
      tempo: '6 min de leitura'
    },
    {
      id: 3,
      titulo: 'Tesouro Direto vs CDB: Qual Investimento Rende Mais?',
      resumo: 'Comparação detalhada entre as duas principais opções de renda fixa disponíveis no Brasil.',
      data: '20 de Dezembro, 2025',
      categoria: 'Investimentos',
      tempo: '10 min de leitura'
    },
    {
      id: 4,
      titulo: 'Amortização Antecipada: Quando Vale a Pena?',
      resumo: 'Descubra em quais situações é vantajoso fazer amortizações extraordinárias do seu financiamento.',
      data: '15 de Dezembro, 2025',
      categoria: 'Financiamento',
      tempo: '7 min de leitura'
    },
    {
      id: 5,
      titulo: 'Imposto de Renda sobre Investimentos: Guia Completo',
      resumo: 'Tudo o que você precisa saber sobre tributação em renda fixa, variável e fundos de investimento.',
      data: '10 de Dezembro, 2025',
      categoria: 'Educação Financeira',
      tempo: '12 min de leitura'
    },
    {
      id: 6,
      titulo: 'Como Usar o FGTS no Financiamento Imobiliário',
      resumo: 'Regras, vantagens e estratégias para usar seu Fundo de Garantia na compra do imóvel.',
      data: '5 de Dezembro, 2025',
      categoria: 'Financiamento',
      tempo: '9 min de leitura'
    }
  ];
}
