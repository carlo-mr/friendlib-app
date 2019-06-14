import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from '../common/book.model';
import {Exemplar} from '../common/exemplar.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  private BASE_URL = 'https://42ss414z2g.execute-api.eu-central-1.amazonaws.com/latest';

  constructor(private httpClient: HttpClient) {

  }

  public addToCollection(book: Book) {
    if (book._links && book._links.addToCollection) {
      const url = this.BASE_URL + book._links.addToCollection.href;

      return this.httpClient[book._links.addToCollection.method.toLowerCase()](url);
    }
    throw new Error('book cannot be added to collection');
  }

  loadCollection(ownerId: string) {
    if (ownerId) {
      return this.httpClient.get(`${this.BASE_URL}/collections/${ownerId}`);
    } else {
      return this.httpClient.get(`${this.BASE_URL}/collections`);
    }
  }

  removeExemplar(exemplar: Exemplar) {
    if (exemplar._links && exemplar._links.removeExemplar) {
      const url = this.BASE_URL + exemplar._links.removeExemplar.href;

      return this.httpClient[exemplar._links.removeExemplar.method.toLowerCase()](url);
    }
    throw new Error('exemplar cannot be removed from collection');
  }
}
