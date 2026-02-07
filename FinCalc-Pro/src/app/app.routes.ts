import { Routes } from '@angular/router';

export const routes: Routes = [
<<<<<<< HEAD
  {
    path: '',
    title: 'FinCalc Pro — Simuladores Financeiros Inteligentes',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'financiamento-imobiliario',
    title: 'Calculadora de Financiamento Imobiliário',
    loadComponent: () =>
      import('./pages/financiamento/financiamento.component').then((m) => m.FinanciamentoComponent),
  },
  {
    path: 'investimentos',
    title: 'Calculadora de CDB e Tesouro',
    loadComponent: () =>
      import('./pages/investimentos/investimentos.component').then((m) => m.InvestimentosComponent),
  },
  {
    path: 'juros-compostos',
    title: 'Calculadora de Juros Compostos — Veja seu dinheiro crescer',
    loadComponent: () =>
      import('./pages/juros-compostos/juros-compostos.component').then(
        (m) => m.JurosCompostosComponent,
      ),
  },
  {
    path: 'politica-privacidade',
    title: 'Política de Privacidade',
    loadComponent: () =>
      import('./pages/politica-privacidade/politica-privacidade.component').then(
        (m) => m.PoliticaPrivacidadeComponent,
      ),
  },
  {
    path: 'termos-uso',
    title: 'Termos de Uso',
    loadComponent: () =>
      import('./pages/termos-uso/termos-uso.component').then((m) => m.TermosUsoComponent),
  },
  {
    path: 'blog',
    title: 'Blog FinCalc Pro — Dicas de Investimento e Financiamento',
    loadComponent: () =>
      import('./pages/blog/blog-list/blog-list.component').then((m) => m.BlogListComponent),
  },
  // {
  //   path: 'mercado',
  //   title: 'Painel de Mercado — Cotações em Tempo Real',
  //   loadComponent: () =>
  //     import('./pages/market-dashboard/market-dashboard.component').then(
  //       (m) => m.MarketDashboardComponent,
  //     ),
  // },
  {
    path: 'blog/:slug',
    title: 'Artigo | FinCalc Pro',
    loadComponent: () =>
      import('./pages/blog/blog-post/blog-post.component').then((m) => m.BlogPostComponent),
  },
  { path: '**', redirectTo: '' },
=======
	{
		path: '',
		title: 'FinCalc Pro — Simuladores Financeiros Inteligentes',
		loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
	},
	{
		path: 'financiamento-imobiliario',
		title: 'Calculadora de Financiamento Imobiliário',
		loadComponent: () => import('./pages/financiamento/financiamento.component').then(m => m.FinanciamentoComponent)
	},
	{
		path: 'investimentos',
		title: 'Calculadora de CDB e Tesouro',
		loadComponent: () => import('./pages/investimentos/investimentos.component').then(m => m.InvestimentosComponent)
	},
	{
		path: 'blog',
		title: 'Blog de Educação Financeira',
		loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
	},
	{
		path: 'glossario',
		title: 'Glossário Financeiro - Termos e Conceitos',
		loadComponent: () => import('./pages/glossario/glossario.component').then(m => m.GlossarioComponent)
	},
	{
		path: 'politica-privacidade',
		title: 'Política de Privacidade',
		loadComponent: () => import('./pages/politica-privacidade/politica-privacidade.component').then(m => m.PoliticaPrivacidadeComponent)
	},
	{
		path: 'termos-uso',
		title: 'Termos de Uso',
		loadComponent: () => import('./pages/termos-uso/termos-uso.component').then(m => m.TermosUsoComponent)
	},
	{ path: '**', redirectTo: '' }
>>>>>>> bcd51a6777befd6f8897ce0744235978ddea4e28
];
