import {Book} from './book.model';

export class Exemplar {
  exemplarId: string;
  ownerId: string;
  book: Book;
  status: string;

  _links?: { removeExemplar?: { href: string, method: string } };
}

export class Collection {
  ownerId: string;
  exemplars: Exemplar[];
}
