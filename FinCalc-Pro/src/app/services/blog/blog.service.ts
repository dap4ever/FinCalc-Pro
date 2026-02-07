import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private posts: BlogPost[] = [
    {
      slug: 'cdb-ou-tesouro-direto-qual-rende-mais-2026',
      title: 'CDB ou Tesouro Direto: Qual rende mais em 2026?',
      excerpt:
        'Descubra as diferenças entre CDB e Tesouro Direto, compare rentabilidades e saiba qual é a melhor opção para seus objetivos financeiros este ano.',
      date: '2026-01-15',
      author: 'Equipe FinCalc Pro',
      category: 'Investimentos',
      tags: ['Renda Fixa', 'CDB', 'Tesouro Direto', 'Comparativo'],
      content: `
        <p>A dúvida entre investir em <strong>CDB</strong> ou <strong>Tesouro Direto</strong> é uma das mais comuns para quem busca segurança e rentabilidade na renda fixa. Ambos são garantidos e previsíveis, mas possuem características que podem fazer toda a diferença no seu bolso.</p>

        <h2>O que é CDB?</h2>
        <p>O <strong>CDB (Certificado de Depósito Bancário)</strong> é um título emitido por bancos. Basicamente, você empresta dinheiro para o banco e ele te devolve com juros.</p>
        <ul>
          <li><strong>Garantia:</strong> FGC (Fundo Garantidor de Créditos) até R$ 250 mil.</li>
          <li><strong>Rentabilidade:</strong> Costuma pagar um percentual do CDI (ex: 110% do CDI).</li>
          <li><strong>Liquidez:</strong> Varia. Pode ser diária ou apenas no vencimento.</li>
        </ul>

        <h2>O que é Tesouro Direto?</h2>
        <p>O <strong>Tesouro Direto</strong> é um programa do governo federal. Você compra títulos da dívida pública.</p>
        <ul>
          <li><strong>Garantia:</strong> Tesouro Nacional (risco soberano, considerado o menor do mercado).</li>
          <li><strong>Rentabilidade:</strong> Pode ser atrelada à Selic, IPCA (inflação) ou prefixada.</li>
          <li><strong>Liquidez:</strong> Diária (o governo garante a recompra).</li>
        </ul>

        <h2>Comparativo de Rentabilidade em 2026</h2>
        <p>Com a taxa Selic em patamares elevados, ambos estão pagando bem. Veja a simulação:</p>
        <div class="bg-gray-100 p-4 rounded-lg my-4 border-l-4 border-blue-500">
          <strong>Cenário: Investimento de R$ 10.000,00 por 2 anos</strong><br>
          <ul>
            <li><strong>CDB 120% do CDI:</strong> Tende a render mais líquido que o Tesouro Selic.</li>
            <li><strong>Tesouro IPCA+:</strong> Vantajoso para proteger do aumento da inflação no longo prazo.</li>
          </ul>
        </div>

        <h2>Veredito: Qual escolher?</h2>
        <ul>
          <li><strong>Escolha CDB se:</strong> Encontrar taxas acima de 110% do CDI e puder deixar o dinheiro preso até o vencimento (para garantir melhores taxas) ou se precisar de liquidez diária em bancos digitais que pagam 100% do CDI.</li>
          <li><strong>Escolha Tesouro Direto se:</strong> Quiser segurança máxima absoluta ou estiver montando uma aposentadoria (Tesouro RendA+ ou IPCA+).</li>
        </ul>
        
        <p>Use nossa <a href="/investimentos" class="text-blue-600 hover:underline">Calculadora de Investimentos</a> para simular os valores exatos antes de decidir!</p>
      `,
    },
    {
      slug: 'financiamento-sac-ou-price-guia-definitivo',
      title: 'Financiamento SAC ou Price? O guia definitivo para economizar',
      excerpt:
        'Entenda de uma vez por todas a diferença entre as tabelas SAC e PRICE e veja qual sistema de amortização vai te fazer economizar milhares de reais.',
      date: '2026-01-18',
      author: 'Equipe FinCalc Pro',
      category: 'Financiamento',
      tags: ['Financiamento', 'Imóveis', 'SAC', 'Price', 'Economia'],
      content: `
        <p>Na hora de financiar um imóvel, a escolha entre <strong>Tabela SAC</strong> e <strong>Tabela PRICE</strong> é uma das decisões financeiras mais importantes da sua vida. A escolha errada pode custar o preço de um carro popular a mais em juros.</p>

        <h2>Tabela SAC (Parcelas Decrescentes)</h2>
        <p>No Sistema de Amortização Constante, você paga sempre o mesmo valor da dívida (amortização) todo mês. Como os juros são calculados sobre o saldo devedor (que diminui), a prestação cai ao longo do tempo.</p>
        <ul>
          <li><strong>Vantagem:</strong> Paga-se menos juros no total.</li>
          <li><strong>Desvantagem:</strong> Começa com parcelas mais altas (exige renda maior para aprovação).</li>
        </ul>

        <h2>Tabela PRICE (Parcelas Fixas)</h2>
        <p>Sistema francês de amortização. A parcela é igual do começo ao fim (exceto pela correção monetária/TR).</p>
        <ul>
          <li><strong>Vantagem:</strong> Parcela inicial menor, facilitando a aprovação.</li>
          <li><strong>Desvantagem:</strong> O saldo devedor cai muito devagar. Você paga muito mais juros no final.</li>
        </ul>

        <h2>Simulação Real</h2>
        <p>Imóvel de R$ 300.000,00 financiado em 30 anos (taxa 10% a.a.):</p>
        <table class="w-full text-left border-collapse my-4">
          <thead>
            <tr class="bg-gray-200">
              <th class="p-2 border">Sistema</th>
              <th class="p-2 border">1ª Parcela</th>
              <th class="p-2 border">Total Pago</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-2 border">SAC</td>
              <td class="p-2 border">~R$ 3.300</td>
              <td class="p-2 border">~R$ 750.000</td>
            </tr>
             <tr>
              <td class="p-2 border">PRICE</td>
              <td class="p-2 border">~R$ 2.600</td>
              <td class="p-2 border">~R$ 940.000</td>
            </tr>
          </tbody>
        </table>

        <div class="bg-yellow-100 p-4 rounded-lg my-4 border-l-4 border-yellow-500">
          <strong>Atenção:</strong> Na PRICE, o total pago pode ser quase <strong>R$ 200 mil a mais</strong> neste exemplo!
        </div>

        <h2>Conclusão</h2>
        <p>Se você tem renda para pagar a parcela inicial da SAC, escolha <strong>SAC</strong>. É matematicamente mais vantajoso. Use a PRICE apenas se for a única forma de o financiamento caber no seu bolso hoje, mas tente amortizar extra sempre que possível.</p>

        <p>Faça sua simulação agora na nossa <a href="/financiamento-imobiliario" class="text-blue-600 hover:underline">Calculadora de Financiamento</a>.</p>
      `,
    },
    {
      slug: 'juros-compostos-como-multiplicar-patrimonio',
      title: 'Juros Compostos: Como multiplicar seu patrimônio no longo prazo',
      excerpt:
        'Albert Einstein supostamente chamou os juros compostos de "a oitava maravilha do mundo". Entenda como essa força matemática pode te deixar rico.',
      date: '2026-01-20',
      author: 'Equipe FinCalc Pro',
      category: 'Educação Financeira',
      tags: ['Juros Compostos', 'Riqueza', 'Educação Financeira', 'Longo Prazo'],
      content: `
        <p>Você já ouviu falar que "dinheiro faz dinheiro"? A explicação matemática para isso são os <strong>juros compostos</strong>. Diferente dos juros simples, onde o rendimento é calculado apenas sobre o valor principal, nos juros compostos você ganha juros sobre os juros acumulados.</p>

        <h2>A Mágica do "Juros sobre Juros"</h2>
        <p>Imagine que você investe R$ 1.000,00 a 10% ao mês (hipotético exagerado para facilitar):</p>
        <ul>
          <li><strong>Mês 1:</strong> Ganha R$ 100. Total: R$ 1.100.</li>
          <li><strong>Mês 2:</strong> Ganha 10% de R$ 1.100 = R$ 110. Total: R$ 1.210.</li>
          <li><strong>Mês 3:</strong> Ganha 10% de R$ 1.210 = R$ 121. Total: R$ 1.331.</li>
        </ul>
        <p>Percebeu? No 3º mês você ganhou mais que no 1º, sem colocar nenhum centavo novo!</p>

        <h2>O Fator Tempo</h2>
        <p>O segredo não é apenas a taxa, mas o <strong>tempo</strong>. Veja R$ 500 investidos mensalmente a 1% ao mês:</p>
        <ul>
          <li><strong>5 anos:</strong> Acumulado ~R$ 40.000 (R$ 10 mil de juros)</li>
          <li><strong>10 anos:</strong> Acumulado ~R$ 115.000 (R$ 55 mil de juros)</li>
          <li><strong>20 anos:</strong> Acumulado ~R$ 490.000 (R$ 370 mil de juros!)</li>
          <li><strong>30 anos:</strong> Acumulado ~R$ 1.7 Milhão (R$ 1.5 Milhão de juros!!)</li>
        </ul>
        
        <p>Nos últimos 10 anos, seu dinheiro trabalha mais do que você.</p>

        <h2>Como aproveitar?</h2>
        <ol>
          <li>Comece cedo (hoje!).</li>
          <li>Tenha consistência (aperte na nossa <a href="/juros-compostos" class="text-blue-600 hover:underline">Calculadora de Juros Compostos</a> para ver).</li>
          <li>Reinvista os dividendos e rendimentos.</li>
          <li>Tenha paciência. O gráfico é exponencial.</li>
        </ol>

        <p>Não espere sobrar dinheiro. Pague-se primeiro e deixe os juros compostos trabalharem.</p>
      `,
    },
  ];

  constructor() {}

  getPosts(): Observable<BlogPost[]> {
    return of(this.posts);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    const post = this.posts.find((p) => p.slug === slug);
    return of(post);
  }

  getLatestPosts(limit: number = 3): Observable<BlogPost[]> {
    return of(this.posts.slice(0, limit));
  }
}
