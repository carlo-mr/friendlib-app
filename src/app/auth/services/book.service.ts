import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../models/book.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private BASE_URL = '/book-service/book';

  constructor(private httpClient: HttpClient) {

  }

  create(resource: Book): Observable<number> {
    return this.httpClient
      .post(this.BASE_URL, resource).pipe(
        map(data => data['id'])
      );
  }
}
