import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    private api = environment.api + 'users/';
    getData(data) {
        return this.http.get(this.api + '/get-user', data );
    }
    login(username: string, password: string) {
        return this.http.post<any>('/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
