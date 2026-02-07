import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  publisher: string;
  providerPublishTime: number;
  type: string;
  thumbnail?: {
    resolutions: {
      url: string;
      width: number;
      height: number;
      tag: string;
    }[];
  };
}

export interface FinanceResponse {
  news: NewsItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MarketNewsService {
  private apiUrl = '/api/finance/news';

  constructor(private http: HttpClient) {}

  getNews(query: string = 'Brazil finance'): Observable<FinanceResponse> {
    return this.http.get<FinanceResponse>(`${this.apiUrl}?q=${query}`);
  }
}
