import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ExemplarActions, ExemplarActionTypes} from './exemplar.actions';
import {createFeatureSelector} from '@ngrx/store';
import {Exemplar} from '../common/exemplar.model';

export interface ExemplarState extends EntityState<Exemplar> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Exemplar> = createEntityAdapter<Exemplar>();

export const initialState: ExemplarState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ExemplarActions
): ExemplarState {
  switch (action.type) {

    case ExemplarActionTypes.LoadExemplarsSuccess: {
      return adapter.upsertMany(action.payload.exemplars, state);
    }

    default: {
      return state;
    }
  }
}

export const getExemplarState = createFeatureSelector<ExemplarState>('exemplar');


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getExemplarState);
