import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './book.reducer';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL = 'https://42ss414z2g.execute-api.eu-central-1.amazonaws.com/latest/books';

  constructor(private httpClient: HttpClient) {

  }

  public search(searchTerm: string) {
    const requestUrl = this.BASE_URL + '?q=' + searchTerm;

    return this.httpClient.get(requestUrl);
  }

  retrieveBook(gbooksId: string): Observable<Book> {
    const requestUrl = this.BASE_URL + '?gbooksId=' + gbooksId;

    return this.httpClient.get(requestUrl) as Observable<Book>;
  }
}
