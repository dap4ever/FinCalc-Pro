import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketDataService, Quote } from '../../services/market-data.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticker.component.html',
  styleUrl: './ticker.component.css',
})
export class TickerComponent implements OnInit {
  quotes$: Observable<Quote[]> | undefined;

  constructor(private marketService: MarketDataService) {}

  ngOnInit() {
    this.quotes$ = this.marketService.getQuotes().pipe(
      catchError((err) => {
        console.error('Ticker error:', err);
        return of([]);
      }),
    );
  }

  isPositive(change: number): boolean {
    return change >= 0;
  }
}
