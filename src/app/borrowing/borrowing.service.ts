import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Borrowing} from '../common/borrowing.model';

@Injectable({
  providedIn: 'root'
})
export class BorrowingService {

  private BASE_URL = 'https://0fues2a81d.execute-api.eu-central-1.amazonaws.com/latest/borrowings';

  constructor(private httpClient: HttpClient) {

  }

  get(exemplarId?: string) {
    const url = exemplarId ? `${this.BASE_URL}?exemplarId=${exemplarId}` : this.BASE_URL;
    return this.httpClient.get(url);
  }

  add(exemplarId: string) {
    return this.httpClient.post(this.BASE_URL, {exemplarId});
  }

  update(borrowing: Borrowing, action: string) {
    const updateAction = borrowing._links[action];

    if (!updateAction) {
      throw new Error('Unsupported update action ' + action);
    }
    return this.httpClient[updateAction.method.toLowerCase()](this.BASE_URL + '/' + updateAction.href, updateAction.body);
  }
}
