import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from './data.service';
import { Subscription, tap } from 'rxjs';
import { PostEntry } from './post.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tips and Tricks in Angular';

  posts: PostEntry[] = [];

  dataService = inject(DataService);
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.dataService.getAllPosts().pipe(
        tap((posts: PostEntry[]) => {
          this.posts = posts;
          console.debug('🔥 posts', this.posts);
        })
      ).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
