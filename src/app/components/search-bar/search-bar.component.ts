import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  searchInfos: string = '';
  @Output() search = new EventEmitter<string>();

  private searchUpdted = new Subject<string>();

  constructor() {
    this.searchUpdted.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.search.emit(value);
    });
  }

  // Emettre immédiatemet la recherche lors du clic sur le bouton
  onSearch() {
    this.search.emit(this.searchInfos);
    console.log('country rechercher ', this.searchInfos);
  }

  // Recherche en fonction de ce 
  onKeyUp() {
    this.searchUpdted.next(this.searchInfos);
  }
}
