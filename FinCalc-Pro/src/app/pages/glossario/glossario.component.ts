import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-glossario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './glossario.component.html',
  styleUrl: './glossario.component.css'
})
export class GlossarioComponent {
  termos = [
    {
      letra: 'A',
      items: [
        {
          termo: 'Amortização',
          definicao: 'É a redução gradual da dívida através de pagamentos periódicos. Em um financiamento, cada parcela contém uma parte de amortização (redução do principal) e outra de juros.'
        },
        {
          termo: 'Ativo',
          definicao: 'Qualquer bem ou direito que possui valor econômico e pode gerar benefícios futuros. Inclui investimentos, imóveis, veículos e outros bens.'
        }
      ]
    },
    {
      letra: 'C',
      items: [
        {
          termo: 'CDB - Certificado de Depósito Bancário',
          definicao: 'Título de renda fixa emitido por bancos para captação de recursos. Funciona como um empréstimo que você faz ao banco em troca de uma remuneração (juros).'
        },
        {
          termo: 'CDI - Certificado de Depósito Interbancário',
          definicao: 'Taxa média de juros que os bancos cobram entre si para empréstimos de curtíssimo prazo. É a principal referência para investimentos de renda fixa no Brasil.'
        },
        {
          termo: 'Custodiante',
          definicao: 'Instituição responsável por guardar e administrar os ativos financeiros de investidores. No Brasil, a B3 atua como custodiante dos títulos do Tesouro Direto.'
        }
      ]
    },
    {
      letra: 'D',
      items: [
        {
          termo: 'Diversificação',
          definicao: 'Estratégia de distribuir investimentos entre diferentes ativos, setores ou tipos de aplicação para reduzir riscos e equilibrar a carteira.'
        },
        {
          termo: 'Dividendos',
          definicao: 'Parte do lucro de uma empresa distribuída aos acionistas. É uma forma de remuneração dos investidores em ações.'
        }
      ]
    },
    {
      letra: 'F',
      items: [
        {
          termo: 'FGC - Fundo Garantidor de Créditos',
          definicao: 'Entidade privada sem fins lucrativos que protege depositantes e investidores em caso de intervenção ou falência de instituições financeiras. Garante até R$ 250.000 por CPF e instituição.'
        },
        {
          termo: 'FGTS - Fundo de Garantia do Tempo de Serviço',
          definicao: 'Depósito mensal feito pelo empregador em nome do trabalhador. Pode ser usado na compra do primeiro imóvel, amortização de financiamento ou em situações específicas.'
        }
      ]
    },
    {
      letra: 'I',
      items: [
        {
          termo: 'Imposto de Renda (IR)',
          definicao: 'Tributo cobrado sobre rendimentos. Em investimentos de renda fixa, segue tabela regressiva que varia de 22,5% a 15% conforme o prazo da aplicação.'
        },
        {
          termo: 'Inflação (IPCA)',
          definicao: 'Aumento generalizado dos preços de bens e serviços. O IPCA (Índice de Preços ao Consumidor Amplo) é o indicador oficial de inflação no Brasil.'
        },
        {
          termo: 'IOF - Imposto sobre Operações Financeiras',
          definicao: 'Tributo cobrado em resgates de investimentos em menos de 30 dias. A alíquota é regressiva, chegando a zero no 30º dia.'
        }
      ]
    },
    {
      letra: 'J',
      items: [
        {
          termo: 'Juros Compostos',
          definicao: 'Juros calculados sobre o capital inicial mais os juros acumulados. É o conceito de "juros sobre juros", que acelera o crescimento dos investimentos ao longo do tempo.'
        },
        {
          termo: 'Juros Simples',
          definicao: 'Juros calculados sempre sobre o valor inicial, sem incorporar os rendimentos anteriores.'
        }
      ]
    },
    {
      letra: 'L',
      items: [
        {
          termo: 'Liquidez',
          definicao: 'Facilidade e velocidade para converter um investimento em dinheiro sem perda significativa de valor. Investimentos com liquidez diária podem ser resgatados a qualquer momento.'
        },
        {
          termo: 'LCI/LCA - Letra de Crédito Imobiliário/Agronegócio',
          definicao: 'Títulos de renda fixa isentos de Imposto de Renda para pessoa física. Emitidos por bancos para financiar os setores imobiliário e do agronegócio.'
        }
      ]
    },
    {
      letra: 'P',
      items: [
        {
          termo: 'Prazo de Vencimento',
          definicao: 'Data em que o investimento ou empréstimo deve ser quitado. Em investimentos, é quando você recebe o valor investido mais os rendimentos.'
        },
        {
          termo: 'Prefixado',
          definicao: 'Investimento com taxa de juros definida no momento da aplicação. Você sabe exatamente quanto vai receber no vencimento.'
        },
        {
          termo: 'Pós-fixado',
          definicao: 'Investimento cuja rentabilidade acompanha um índice de referência (CDI, Selic, IPCA). O retorno final só é conhecido no vencimento.'
        }
      ]
    },
    {
      letra: 'R',
      items: [
        {
          termo: 'Rentabilidade',
          definicao: 'Percentual de retorno obtido em um investimento em determinado período. Pode ser bruta (antes dos impostos) ou líquida (após impostos e taxas).'
        },
        {
          termo: 'Risco',
          definicao: 'Probabilidade de perda ou variação negativa no valor de um investimento. Geralmente, maior risco está associado a potencial de maior retorno.'
        }
      ]
    },
    {
      letra: 'S',
      items: [
        {
          termo: 'SAC - Sistema de Amortização Constante',
          definicao: 'Sistema de pagamento onde a amortização é fixa e os juros decrescem a cada parcela, resultando em prestações decrescentes ao longo do tempo.'
        },
        {
          termo: 'Selic',
          definicao: 'Taxa básica de juros da economia brasileira, definida pelo Banco Central. Serve como referência para diversos investimentos e empréstimos.'
        },
        {
          termo: 'Score de Crédito',
          definicao: 'Pontuação que indica a probabilidade de um consumidor pagar suas contas em dia. Vai de 0 a 1000 e influencia aprovação de crédito e taxas de juros.'
        }
      ]
    },
    {
      letra: 'T',
      items: [
        {
          termo: 'Tabela Price',
          definicao: 'Sistema de amortização com parcelas fixas durante todo o período. Nos primeiros meses, paga-se mais juros e menos amortização, invertendo ao longo do tempo.'
        },
        {
          termo: 'Taxa de Administração',
          definicao: 'Percentual cobrado por instituições financeiras para gerenciar investimentos, especialmente em fundos. No Tesouro Direto, muitas corretoras isentam essa taxa.'
        },
        {
          termo: 'Tesouro Direto',
          definicao: 'Programa do governo federal que permite pessoas físicas comprarem títulos públicos pela internet. Considerado o investimento mais seguro do Brasil.'
        }
      ]
    },
    {
      letra: 'V',
      items: [
        {
          termo: 'Valor Nominal',
          definicao: 'Valor de face de um título ou investimento, geralmente usado como base para cálculo de juros e rentabilidade.'
        },
        {
          termo: 'Volatilidade',
          definicao: 'Medida da variação de preço de um ativo ao longo do tempo. Alta volatilidade indica grandes oscilações, o que representa maior risco.'
        }
      ]
    }
  ];
}
