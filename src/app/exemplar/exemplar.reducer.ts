import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {ExemplarActions, ExemplarActionTypes} from './exemplar.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Exemplar} from '../common/exemplar.model';
import {CollectionActions, CollectionActionTypes} from '../collection/actions/collection.actions';

export interface ExemplarState extends EntityState<Exemplar> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Exemplar> = createEntityAdapter<Exemplar>({
  selectId: entity => entity.exemplarId
});

export const initialState: ExemplarState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ExemplarActions | CollectionActions
): ExemplarState {
  switch (action.type) {

    case ExemplarActionTypes.LoadExemplarsSuccess: {
      return adapter.upsertMany(action.payload.exemplars, state);
    }

    case CollectionActionTypes.RemoveExemplarSuccess: {
      return adapter.removeOne(action.payload.exemplar.exemplarId, state);
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

export const selectEntity = exemplarId => createSelector(
  getExemplarState,
  (state: ExemplarState) => state.entities[exemplarId]
);

export const selectEntityList = (exemplarIds: string[]) => createSelector(
  selectAll,
  (exemplars: Exemplar[]) => exemplars.filter((exemplar: Exemplar) => exemplarIds.indexOf(exemplar.exemplarId) > -1)
);
