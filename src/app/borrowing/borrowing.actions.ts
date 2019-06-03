import {Action} from '@ngrx/store';
import {Borrowing} from '../common/borrowing.model';

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
  UpdateBorrowingError = '[Borrowing] Update borrowing error'
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

  constructor(public payload: { exemplarId: string }) {
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

  constructor(public payload: { borrowing: Borrowing, newStatus: string, updateDate: string }) {
  }
}

export class UpdateBorrowingError implements Action {
  readonly type = BorrowingActionTypes.UpdateBorrowingError;

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
  | UpdateBorrowingError;
