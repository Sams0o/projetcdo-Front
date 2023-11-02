import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { UserLogin } from '../models/userLogin.model';
import { LoginResponse } from '../models/loginResponse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
    return this.http.post<LoginResponse>(
      `http://localhost:3000/api/auth/login`,
      data
    );
  }

  getUserById(): Observable<User> {
    const headers = this.setHeaders();
    return this.http.get<User>(`http://localhost:3000/api/auth`, {
      headers,
    });
  }
}
