import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService, BlogPost } from '../../../services/blog/blog.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-post.component.html',
})
export class BlogPostComponent implements OnInit {
  post$!: Observable<BlogPost | undefined>;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const slug = params.get('slug');
        if (slug) {
          return this.blogService.getPostBySlug(slug);
        }
        return new Observable<undefined>((observer) => observer.next(undefined));
      }),
    );
  }
}
