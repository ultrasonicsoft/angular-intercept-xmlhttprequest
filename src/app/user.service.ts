import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId = 0;
  http = inject(HttpClient);

  constructor() { }

}
