import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private http: HttpClient) {}
  private api = environment.api + 'users/';
  getData(data) {
    return this.http.get(this.api + '/get-user', data );
  }
}

