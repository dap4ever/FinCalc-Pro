import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
