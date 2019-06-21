import {Action} from '@ngrx/store';
import {Borrowing} from '../common/borrowing.model';
import {BookOwner} from '../common/book.model';
import {Exemplar} from '../common/exemplar.model';

export enum BorrowingActionTypes {
  LoadBorrowings = '[Borrowing] Load borrowings',
  LoadBorrowingsSuccess = '[Borrowing] Load borrowings success',
  LoadBorrowingsError = '[Borrowing] Load borrowings error',

  LoadExemplarBorrowings = '[Borrowing] Load exemplar borrowings',
  LoadExemplarBorrowingsSuccess = '[Borrowing] Load exemplar borrowing ssuccess',
  LoadExemplarBorrowingsError = '[Borrowing] Load exemplar borrowing serror',

  AddBorrowing = '[Borrowing] Add borrowing',
  AddBorrowingSuccess = '[Borrowing] Add borrowing success',
  AddBorrowingError = '[Borrowing] Add borrowing error',

  UpdateBorrowing = '[Borrowing] Update borrowing',
  UpdateBorrowingSuccess = '[Borrowing] Update borrowing success',
  UpdateBorrowingError = '[Borrowing] Update borrowing error',

  AcceptBorrowing = '[Borrowing] Accept borrowing',
  AcceptBorrowingSuccess = '[Borrowing] Accept borrowing success',
  AcceptBorrowingError = '[Borrowing] Accept borrowing error',

  RejectBorrowing = '[Borrowing] Reject borrowing',
  RejectBorrowingSuccess = '[Borrowing] Reject borrowing success',
  RejectBorrowingError = '[Borrowing] Reject borrowing error',

  ReceiveBorrowing = '[Borrowing] Receive borrowing',
  ReceiveBorrowingSuccess = '[Borrowing] Receive borrowing success',
  ReceiveBorrowingError = '[Borrowing] Receive borrowing error',

  CompleteBorrowing = '[Borrowing] Complete borrowing',
  CompleteBorrowingSuccess = '[Borrowing] Complete borrowing success',
  CompleteBorrowingError = '[Borrowing] Complete borrowing error'
}

export class LoadBorrowings implements Action {
  readonly type = BorrowingActionTypes.LoadBorrowings;

  constructor() {
  }
}

export class LoadBorrowingsSuccess implements Action {
  readonly type = BorrowingActionTypes.LoadBorrowingsSuccess;

  constructor(public payload: { borrowings: Borrowing[] }) {
  }
}

export class LoadBorrowingsError implements Action {
  readonly type = BorrowingActionTypes.LoadBorrowingsError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class LoadExemplarBorrowings implements Action {
  readonly type = BorrowingActionTypes.LoadExemplarBorrowings;

  constructor(public payload: { exemplarId: string }) {
  }
}

export class LoadExemplarBorrowingsSuccess implements Action {
  readonly type = BorrowingActionTypes.LoadExemplarBorrowingsSuccess;

  constructor(public payload: { borrowings: Borrowing[] }) {
  }
}

export class LoadExemplarBorrowingsError implements Action {
  readonly type = BorrowingActionTypes.LoadExemplarBorrowingsError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class AddBorrowing implements Action {
  readonly type = BorrowingActionTypes.AddBorrowing;

  constructor(public payload: { bookOwner: BookOwner }) {
  }
}

export class AddBorrowingSuccess implements Action {
  readonly type = BorrowingActionTypes.AddBorrowingSuccess;

  constructor(public payload: { borrowing: Borrowing }) {
  }
}

export class AddBorrowingError implements Action {
  readonly type = BorrowingActionTypes.AddBorrowingError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class UpdateBorrowing implements Action {
  readonly type = BorrowingActionTypes.UpdateBorrowing;

  constructor(public payload: { borrowing: Borrowing, action: string }) {
  }
}

export class UpdateBorrowingSuccess implements Action {
  readonly type = BorrowingActionTypes.UpdateBorrowingSuccess;

  constructor(public payload: { borrowing: Borrowing, newStatus: string, updateDate: string, action: string }) {
  }
}

export class UpdateBorrowingError implements Action {
  readonly type = BorrowingActionTypes.UpdateBorrowingError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class AcceptBorrowing implements Action {
  readonly type = BorrowingActionTypes.AcceptBorrowing;

  constructor(public payload: { borrowing: Borrowing, action: string }) {
  }
}

export class AcceptBorrowingSuccess implements Action {
  readonly type = BorrowingActionTypes.AcceptBorrowingSuccess;

  constructor(public payload: { borrowing: Borrowing }) {
  }
}

export class AcceptBorrowingError implements Action {
  readonly type = BorrowingActionTypes.AcceptBorrowingError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class RejectBorrowing implements Action {
  readonly type = BorrowingActionTypes.RejectBorrowing;

  constructor(public payload: { borrowing: Borrowing, action: string }) {
  }
}

export class RejectBorrowingSuccess implements Action {
  readonly type = BorrowingActionTypes.RejectBorrowingSuccess;

  constructor(public payload: { borrowing: Borrowing }) {
  }
}

export class RejectBorrowingError implements Action {
  readonly type = BorrowingActionTypes.RejectBorrowingError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class ReceiveBorrowing implements Action {
  readonly type = BorrowingActionTypes.ReceiveBorrowing;

  constructor(public payload: { borrowing: Borrowing, action: string }) {
  }
}

export class ReceiveBorrowingSuccess implements Action {
  readonly type = BorrowingActionTypes.ReceiveBorrowingSuccess;

  constructor(public payload: { exemplar: Exemplar, borrowings: Borrowing[] }) {
  }
}

export class ReceiveBorrowingError implements Action {
  readonly type = BorrowingActionTypes.ReceiveBorrowingError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class CompleteBorrowing implements Action {
  readonly type = BorrowingActionTypes.CompleteBorrowing;

  constructor(public payload: { borrowing: Borrowing, action: string }) {
  }
}

export class CompleteBorrowingSuccess implements Action {
  readonly type = BorrowingActionTypes.CompleteBorrowingSuccess;

  constructor(public payload: { exemplar: Exemplar, originalBorrowing: Borrowing }) {
  }
}

export class CompleteBorrowingError implements Action {
  readonly type = BorrowingActionTypes.CompleteBorrowingError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export type BorrowingActions =
  LoadBorrowings
  | LoadBorrowingsSuccess
  | LoadBorrowingsError
  | LoadExemplarBorrowings
  | LoadExemplarBorrowingsSuccess
  | LoadExemplarBorrowingsError
  | AddBorrowing
  | AddBorrowingSuccess
  | AddBorrowingError
  | UpdateBorrowing
  | UpdateBorrowingSuccess
  | UpdateBorrowingError
  | AcceptBorrowing
  | AcceptBorrowingSuccess
  | AcceptBorrowingError
  | RejectBorrowing
  | RejectBorrowingSuccess
  | RejectBorrowingError
  | ReceiveBorrowing
  | ReceiveBorrowingSuccess
  | ReceiveBorrowingError
  | CompleteBorrowing
  | CompleteBorrowingSuccess
  | CompleteBorrowingError;
