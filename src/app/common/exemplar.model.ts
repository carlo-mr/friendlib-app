import {Book} from './book.model';
import {Borrowing} from './borrowing.model';

export class Exemplar {
  exemplarId: string;
  ownerId: string;
  book: Book;
  status: string;
  lentTo: string;

  borrowings: Borrowing[] = [];

  _links?: { removeExemplar?: { href: string, method: string } };
}
