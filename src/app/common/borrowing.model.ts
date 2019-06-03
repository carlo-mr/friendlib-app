export class Borrowing {
  borrowingId: string;
  exemplarId: string;
  status: string;

  ownerId: string;
  borrowerId: string;

  creationDate?: string;
  updateDate?: string;

  _links: BorrowingLinks;
}

export interface BorrowingLinks {
  // owner
  accept?: any;
  reject?: any;
  complete?: any;

  // borrower
  receive?: any;
}
