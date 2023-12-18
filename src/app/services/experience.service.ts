import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private experiencesSource = new BehaviorSubject<Experience[]>([]);
  public experiences$ = this.experiencesSource.asObservable();

  private experienceRefreshSource = new Subject<void>();
  experienceRefresh$ = this.experienceRefreshSource.asObservable();

  constructor(private http: HttpClient) {}

  setHeaders() {
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${jwtToken}`,
    });
    return headers;
  }

  updateExperiences(experiences: Experience[]) {
    this.experiencesSource.next(experiences);
    console.log('Mise à jour des expériences avec:', experiences);
  }

  getExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>(
      `http://localhost:3000/api/experiences/all`
    );
  }

  getExperienceId(idExperience: number): Observable<Experience> {
    return this.http.get<Experience>(
      `http://localhost:3000/api/experiences/${idExperience}`,
      { headers: this.setHeaders() }
    );
  }

  createExperience(experience: Experience) {
    return this.http
      .post<Experience>('http://localhost:3000/api/experiences', experience, {
        headers: this.setHeaders(),
      })
      .pipe(
        tap(() => {
          this.experienceRefreshSource.next();
        })
      );
  }

  updateExperience(experience: Experience): Observable<Experience> {
    return this.http.patch<Experience>(
      `http://localhost:3000/api/experiences/${experience.id}`,
      experience,
      { headers: this.setHeaders() }
    );
  }

  removeExperience(experience: number) {
    return this.http.delete<Experience>(
      `http://localhost:3000/api/experiences/${experience}`,
      { headers: this.setHeaders() }
    );
  }
}
