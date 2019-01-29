import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Book} from './book.reducer';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public searchBooks(searchTerm: string) {
    return of([{
      id: searchTerm + '123',
      title: searchTerm
    } as Book,
      {
        id: searchTerm + 'abc',
        title: searchTerm + ' 2'
      } as Book]);
  }
}
