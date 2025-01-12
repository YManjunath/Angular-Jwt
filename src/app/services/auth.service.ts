import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token!: string;

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  signUp(name: string, email: string, password: string): Observable<any> {
    let signUpData = { name: name, email: email, password: password };
    return this.http.post('http://localhost:3000/api/auth/signup', signUpData);
  }

  login(email: string, password: string): Observable<any> {
    let loginData = { email: email, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        'http://localhost:3000/api/auth/login',
        loginData
      )
      .pipe(
        tap((res) => {
          this.token = res.token;
        })
      );
  }
}
