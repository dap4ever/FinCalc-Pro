import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BlogService, BlogPost } from '../../services/blog/blog.service';
import { NewsComponent } from '../../components/news/news.component';
import { HeroNewsComponent } from '../../components/hero-news/hero-news.component';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink, NewsComponent, HeroNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  latestPosts$: Observable<BlogPost[]>;

  constructor(private blogService: BlogService) {
    this.latestPosts$ = this.blogService.getLatestPosts(3);
  }
}
