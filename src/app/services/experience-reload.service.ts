import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceReloadService {
  private experienceUpdateSource = new BehaviorSubject<string>('');
  experienceRefresh$ = this.experienceUpdateSource.asObservable();

  constructor() {}

  notifyExperienceRefresh(action: string): void {
    this.experienceUpdateSource.next(action);
  }
}
