import {CollectionActions, CollectionActionTypes} from '../actions/collection.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Collection} from '../../common/collection.model';

export const collectionAdapter = createEntityAdapter<Collection>({
  selectId: (collection: Collection) => collection.ownerId
});

export interface CollectionState extends EntityState<Collection> {
}

const defaultState = {
  ids: [],
  entities: {}
};

export const initialState: CollectionState = collectionAdapter.getInitialState(defaultState);

export function collectionReducer(state = initialState, action: CollectionActions): CollectionState {
  switch (action.type) {

    case CollectionActionTypes.LoadCollectionSuccess:
      return collectionAdapter.addOne(action.payload.collection, state);

    case CollectionActionTypes.AddBookToCollectionSuccess:
      const addBookNewState = {...state};
      addBookNewState.entities[action.payload.exemplar.ownerId].exemplars.push(action.payload.exemplar);
      return addBookNewState;

    case CollectionActionTypes.RemoveExemplarSuccess:
      const removeExemplarNewState = {...state};
      const collection = removeExemplarNewState.entities[action.payload.exemplar.ownerId];
      collection.exemplars.splice(collection.exemplars.indexOf(action.payload.exemplar), 1);
      return removeExemplarNewState;

    default:
      return state;
  }
}

export const getCollectionState = createFeatureSelector<CollectionState>('collection');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = collectionAdapter.getSelectors();

export const selectCollectionIds = selectIds;
export const selectCollectionEntities = selectEntities;
export const selectAllCollections = selectAll;
export const selectCollectionTotal = selectTotal;

export const selectEntity = ownerId => createSelector(
  getCollectionState,
  (state: CollectionState) => state.entities[ownerId]
);
