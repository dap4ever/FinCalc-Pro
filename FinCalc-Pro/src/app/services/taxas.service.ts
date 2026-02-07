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
  // Atualizado para dezembro de 2025
  // SELIC: 15% a.a. | CDI: 14.90% a.a. | Financiamento: ~15.50% a.a.
  getTaxas(): Observable<TaxaJuros> {
    return of({
      selic: 15.00,
      financiamentoImobiliario: 15.50,
      cdi: 14.90
    });
  }
}
