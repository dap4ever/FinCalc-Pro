import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface TaxaJuros {
  selic: number;
  financiamentoImobiliario: number;
  cdi: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaxasService {
  private http = inject(HttpClient);
  
  // API do Banco Central do Brasil
  private readonly API_BCB = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs';

  getTaxas(): Observable<TaxaJuros> {
    // Buscar múltiplas taxas em paralelo
    const selic$ = this.http.get<Array<{ data: string; valor: string }>>(`${this.API_BCB}/432/dados/ultimos/1?formato=json`);
    const financiamento$ = this.http.get<Array<{ data: string; valor: string }>>(`${this.API_BCB}/25497/dados/ultimos/1?formato=json`);
    const cdi$ = this.http.get<Array<{ data: string; valor: string }>>(`${this.API_BCB}/12/dados/ultimos/1?formato=json`);

    return new Observable<TaxaJuros>(observer => {
      Promise.all([
        selic$.toPromise(),
        financiamento$.toPromise(),
        cdi$.toPromise()
      ]).then(([selicData, financiamentoData, cdiData]) => {
        observer.next({
          selic: parseFloat(selicData?.[0]?.valor || '10.75'),
          financiamentoImobiliario: parseFloat(financiamentoData?.[0]?.valor || '10.5'),
          cdi: parseFloat(cdiData?.[0]?.valor || '10.65')
        });
        observer.complete();
      }).catch(() => {
        // Valores fallback caso a API falhe
        observer.next({
          selic: 10.75,
          financiamentoImobiliario: 10.5,
          cdi: 10.65
        });
        observer.complete();
      });
    });
  }
}
