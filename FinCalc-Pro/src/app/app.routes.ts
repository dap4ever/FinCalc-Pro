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
	{ path: '**', redirectTo: '' }
];
