import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`http://localhost:3000/api/countries`);
  }

  getCountryById(idCountry: number): Observable<Country> {
    return this.http.get<Country>(
      `http://localhost:3000/api/countries/${idCountry}`,
      { headers: this.setHeaders() }
    );
  }
}
