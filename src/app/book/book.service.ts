import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL = 'http://localhost:8080/book-service/book';

  constructor(private httpClient: HttpClient) {

  }

  public search(searchTerm: string) {
    const requestUrl = this.BASE_URL + '?q=' + searchTerm;

    return this.httpClient.get(requestUrl);
  }
}
