import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor() { }

  private searchResults = new BehaviorSubject<any>([]);
  setResult(result: any) {
    this.searchResults.next(result);
  }

  getResult() {
    return this.searchResults.asObservable();
  }
}
