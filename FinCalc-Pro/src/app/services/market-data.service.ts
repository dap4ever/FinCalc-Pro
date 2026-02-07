import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChangePercent: number;
  shortName: string;
}

export interface TrendingResult {
  quotes: { symbol: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  private apiUrl = '/api/finance';

  constructor(private http: HttpClient) {}

  getQuotes(symbols: string = '^BVSP,USDBRL=X,EURBRL=X,BTC-USD'): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/quotes?symbols=${symbols}`);
  }

  getMovers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movers`);
  }
}
