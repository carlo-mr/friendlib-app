export interface BorrowingLinks {
  // owner
  accept?: any;
  reject?: any;
  complete?: any;

  // borrower
  receive?: any;
}

export class Borrowing {
  borrowingId: string;
  status: string;
  borrowerId: string;
  exemplarId: string;
  ownerId: string;

  creationDate: string;
  updateDate?: string;

  _links?: BorrowingLinks;
}
