import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TaxaJuros {
  selic: number;
  financiamentoImobiliario: number;
  cdi: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaxasService {
  
  // Valores estáticos baseados nas taxas do Banco Central
  // Em produção, isso viria de um backend que faz o proxy da API
  getTaxas(): Observable<TaxaJuros> {
    return of({
      selic: 10.75,
      financiamentoImobiliario: 10.5,
      cdi: 10.65
    });
  }
}
