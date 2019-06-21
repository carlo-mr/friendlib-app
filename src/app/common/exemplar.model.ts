export class Exemplar {
  exemplarId: string;
  ownerId: string;
  book: string;
  status: string;
  lentTo: string;

  borrowings: string[] = [];

  _links?: { removeExemplar?: { href: string, method: string } };
}
