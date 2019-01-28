import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Book} from './book.reducer';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  searchBooks(searchTerm: string) {
    return of([{
      id: 'test123',
      title: 'Harry Potter'
    } as Book,
      {
        id: 'asdbac',
        title: 'Harry Potter 2'
      } as Book]);
  }
}
