import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentUpdateService {
  private contentUpdateSource = new Subject<any>();

  contentUpdated$ = this.contentUpdateSource.asObservable();

  constructor() {}

  updateContent(content: any) {
    this.contentUpdateSource.next(content);
  }
}
