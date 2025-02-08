import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private searchTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  constructor() { }
  
  setSearchText(searchText: string): void {
    this.searchTextSubject.next(searchText);
  }
  
  getSearchText(): Observable<string> {
    return this.searchTextSubject.asObservable();
  }
}
