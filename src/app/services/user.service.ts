import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserLogin } from '../models/userLogin.model';
import { LoginResponse } from '../models/loginResponse.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  registerUser(data: User) {
    console.log('registerUser', data);
    return this.http.post(`http://localhost:3000/api/auth/register`, data);
  }

  loginUser(data: UserLogin): Observable<LoginResponse> {
    console.log('loginUser', data);
    return this.http.post<LoginResponse>(`http://localhost:3000/api/auth/login`, data).pipe(
      tap((res) => {
        this.loggedIn.next(true);
        localStorage.setItem('token', res.accessToken);
      })
    );
  }

  getUserById(): Observable<User> {
    const headers = this.setHeaders();
    
    return this.http.get<User>(`http://localhost:3000/api/auth`, {
      headers,
    });      
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/connexion/login'])
  }
}
