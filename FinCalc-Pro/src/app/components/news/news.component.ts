import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MarketNewsService, NewsItem } from '../../services/market-news.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news$: Observable<NewsItem[]> | undefined;

  constructor(
    private newsService: MarketNewsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.news$ = this.newsService.getNews().pipe(
        map((response) => response.news),
        catchError((error) => {
          console.error('Failed to load news:', error);
          return of([]);
        }),
      );
    }
  }
}
