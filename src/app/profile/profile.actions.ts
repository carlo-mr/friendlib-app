import {Action} from '@ngrx/store';

export enum ProfileActionTypes {
  DummyAction = '[Profile] Dummy'
}

export class DummyAction implements Action {
  readonly type = ProfileActionTypes.DummyAction;

  constructor() {
  }
}

export type ProfileActions = DummyAction;
