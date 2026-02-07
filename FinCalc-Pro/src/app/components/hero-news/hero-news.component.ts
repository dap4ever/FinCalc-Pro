import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MarketNewsService, NewsItem } from '../../services/market-news.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-hero-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-news.component.html',
  styleUrl: './hero-news.component.css',
})
export class HeroNewsComponent implements OnInit {
  newsItems$: Observable<NewsItem[]> = of([]);
  currentIndex = 0;
  totalItems = 0;
  private autoRotateInterval: any;

  constructor(
    private newsService: MarketNewsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.newsItems$ = this.newsService.getNews().pipe(
        map((response) => {
          const items = response.news || [];
          this.totalItems = items.length;
          return items;
        }),
        catchError((err) => {
          console.error('Hero news error:', err);
          return of([]);
        }),
      );
      this.startAutoRotate();
    }
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
    this.resetAutoRotate();
  }

  nextSlide() {
    if (this.totalItems > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.totalItems;
      this.resetAutoRotate();
    }
  }

  prevSlide() {
    if (this.totalItems > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
      this.resetAutoRotate();
    }
  }

  getCurrentItem(items: NewsItem[]): NewsItem | null {
    if (!items || items.length === 0) return null;
    return items[this.currentIndex];
  }

  private startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      if (this.totalItems > 1) {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
      }
    }, 5000); // Rotate every 5 seconds
  }

  private resetAutoRotate() {
    clearInterval(this.autoRotateInterval);
    this.startAutoRotate();
  }
}
