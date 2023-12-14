import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private previousUrl: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public previousUrl$: Observable<string | null> =
    this.previousUrl.asObservable();

  constructor(private router: Router) {
    console.log('Coucou');

    let currentUrl: string | null = null;

    this.router.events.subscribe((event) => {
      console.log(event);

      if (event instanceof NavigationEnd) {
        if (currentUrl) {
          this.previousUrl.next(currentUrl); // Màj de l'URL précédente
          console.log('url précédente', currentUrl);
        }
        currentUrl = event.url; // Màj de l'URL actuelle
        console.log('nouvel page', event.url);
      }
    });
  }
}
