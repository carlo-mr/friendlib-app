export interface Book {
  bookId?: string;

  title: string;
  description?: string;
  language?: string;

  coverUrl?: string;
  productUrl?: string;

  authors?: string[];
  binding?: string;
  pages?: number;

  alternatives?: Book[];
  externalIdentifiers?: ExternalIdentifier;

  owners?: BookOwner[];

  _links?: { addToCollection?: { href: string, method: string } };
}

export class BookOwner {
  exemplarId: string;
  ownerId: string;
}

export class ExternalIdentifier {
  isbn10?: string;
  isbn13?: string;
  asin?: string;
  gbooksId?: string;
}
