import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { slug: 'cdb-ou-tesouro-direto-qual-rende-mais-2026' },
        { slug: 'financiamento-sac-ou-price-guia-definitivo' },
        { slug: 'juros-compostos-como-multiplicar-patrimonio' },
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
