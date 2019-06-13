import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Borrowing} from '../common/borrowing.model';
import {BookOwner} from '../common/book.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  private BASE_URL = 'https://42ss414z2g.execute-api.eu-central-1.amazonaws.com/latest';

  constructor(private httpClient: HttpClient) {

  }

  get(exemplarId?: string) {
    const url = exemplarId ? `${this.BASE_URL}?exemplarId=${exemplarId}` : this.BASE_URL;
    return this.httpClient.get(url);
  }

  add(bookOwner: BookOwner) {
    const url = `${this.BASE_URL}/collections/${bookOwner.ownerId}/exemplars/${bookOwner.exemplarId}/borrowings`;
    return this.httpClient.post(url, {});
  }

  update(borrowing: Borrowing, action: string) {
    const updateAction = borrowing._links[action];

    if (!updateAction) {
      throw new Error('Unsupported update action ' + action);
    }
    return this.httpClient[updateAction.method.toLowerCase()](this.BASE_URL + updateAction.href, updateAction.body);
  }
}
