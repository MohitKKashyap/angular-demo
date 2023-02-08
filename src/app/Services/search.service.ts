import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  private searchResults = new BehaviorSubject<any>([]);

  setResults(results: any) {
    this.searchResults.next(results);
  }

  getResults() {
    return this.searchResults.asObservable();
  }
}
