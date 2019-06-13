import {Action} from '@ngrx/store';
import {Collection} from '../../common/collection.model';
import {Book} from '../../common/book.model';
import {Exemplar} from '../../common/exemplar.model';

export enum CollectionActionTypes {
  LoadCollection = '[Collection] Load Collection',
  LoadCollectionSuccess = '[Collection] Load Collection Success',
  LoadCollectionError = '[Collection] Load Collection Error',

  AddBookToCollection = '[Collection] Add book to collection',
  AddBookToCollectionSuccess = '[Collection] Add book to collection success',
  AddBookToCollectionError = '[Collection] Add book to collection error',

  RemoveExemplar = '[Collection] Remove exemplar',
  RemoveExemplarSuccess = '[Collection] Remove exemplar success',
  RemoveExemplarError = '[Collection] Remove exemplar error',
}

export class LoadCollection implements Action {
  readonly type = CollectionActionTypes.LoadCollection;

  constructor(public payload?: { ownerId?: string, refresher?: any }) {

  }
}

export class LoadCollectionSuccess implements Action {
  readonly type = CollectionActionTypes.LoadCollectionSuccess;

  constructor(public payload: { collection: Collection }) {

  }
}

export class LoadCollectionError implements Action {
  readonly type = CollectionActionTypes.LoadCollectionError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export class AddBookToCollection implements Action {
  readonly type = CollectionActionTypes.AddBookToCollection;

  constructor(public payload: { book: Book }) {

  }
}

export class AddBookToCollectionSuccess implements Action {
  readonly type = CollectionActionTypes.AddBookToCollectionSuccess;

  constructor(public payload: { exemplar: Exemplar }) {

  }
}

export class AddBookToCollectionError implements Action {
  readonly type = CollectionActionTypes.AddBookToCollectionError;

  constructor(public payload: { errorMessage: string }) {

  }
}

export class RemoveExemplar implements Action {
  readonly type = CollectionActionTypes.RemoveExemplar;

  constructor(public payload: { exemplar: Exemplar }) {

  }
}

export class RemoveExemplarSuccess implements Action {
  readonly type = CollectionActionTypes.RemoveExemplarSuccess;

  constructor(public payload: { exemplar: Exemplar }) {

  }
}

export class RemoveExemplarError implements Action {
  readonly type = CollectionActionTypes.RemoveExemplarError;

  constructor(public payload: { errorMessage: string }) {

  }
}

export type CollectionActions =
  LoadCollection
  | LoadCollectionSuccess
  | LoadCollectionError
  | AddBookToCollection
  | AddBookToCollectionSuccess
  | AddBookToCollectionError
  | RemoveExemplar
  | RemoveExemplarSuccess
  | RemoveExemplarError;
