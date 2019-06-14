import {Action} from '@ngrx/store';
import {Exemplar} from '../common/exemplar.model';

export enum ExemplarActionTypes {
  LoadExemplars = '[Exemplar] Load Exemplars',
  LoadExemplarsSuccess = '[Exemplar] Load Exemplars Success',
  LoadExemplarsError = '[Exemplar] Load Exemplars Error',
}

export class LoadExemplars implements Action {
  readonly type = ExemplarActionTypes.LoadExemplars;

  constructor(public payload: {}) {
  }
}

export class LoadExemplarsSuccess implements Action {
  readonly type = ExemplarActionTypes.LoadExemplarsSuccess;

  constructor(public payload: { exemplars: Exemplar[] }) {
  }
}

export class LoadExemplarsError implements Action {
  readonly type = ExemplarActionTypes.LoadExemplarsError;

  constructor(public payload: { errorMessage: string }) {
  }
}

export type ExemplarActions =
  LoadExemplars
  | LoadExemplarsSuccess
  | LoadExemplarsError;
