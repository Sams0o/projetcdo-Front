import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchInfos: string = ''; // Variable pour garder la valeur saisie dans la searchBar
  @Output() search = new EventEmitter<string>(); // Préparation pour envoyer la valeur de recherche au composant parent

  private searchUpdted = new Subject<string>(); // Subject pour gérer la valeur de recherche

  constructor() {
    this.searchUpdted
      .pipe(
        debounceTime(300), // Attente de 300 millisecondes après chaque frappe pour réduire le nombre d'événements
        distinctUntilChanged() // Ne pas envoyer de nouvelles valeurs si elles sont identiques à la précédente
      ).subscribe((value) => {
        this.search.emit(value); // Envoi de la valeur de recherche au composant parent
      });
  }

  // Envoi de la valeur actuelle lors du clic sur le bouton
  onSearch() {
    this.search.emit(this.searchInfos);
  }

  // Appelée à chaque fois qu'une touche est relâchée dans la searchBar
  onKeyUp() {
    this.searchUpdted.next(this.searchInfos); // MàJ du Subject avec la nouvelle valeur de recherche
  }
}
