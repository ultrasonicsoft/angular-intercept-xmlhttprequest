import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PostEntry } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http = inject(HttpClient)

  postsUrl = `https://jsonplaceholder.typicode.com/posts`;

  getAllPosts(): Observable<PostEntry[]> {
    return this.http.get<PostEntry[]>(this.postsUrl);
  }
}
