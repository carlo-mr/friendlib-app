import {Borrowing} from './borrowing.model';
import {Exemplar} from './exemplar.model';

export class Collection {
  ownerId: string;
  exemplars: Exemplar[];

  borrowedExemplars: Exemplar[] = [];
  borrowingRequests: Borrowing[] = [];
}
