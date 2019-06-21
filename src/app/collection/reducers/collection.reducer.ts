import {CollectionActions, CollectionActionTypes} from '../actions/collection.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Collection} from '../../common/collection.model';

import * as fromAuth from '../../auth/reducers/auth.reducer';
import {BorrowingActions} from '../../borrowing/borrowing.actions';

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

export function collectionReducer(state = initialState, action: CollectionActions | BorrowingActions): CollectionState {
  switch (action.type) {

    case CollectionActionTypes.AddCollection:
      return collectionAdapter.addOne(action.payload.collection, state);

    case CollectionActionTypes.AddBookToCollectionSuccess:
      const addBookNewState = {...state};
      if (addBookNewState.entities[action.payload.exemplar.ownerId]) {
        addBookNewState.entities[action.payload.exemplar.ownerId].exemplars.push(action.payload.exemplar.exemplarId);
      }
      return addBookNewState;

    case CollectionActionTypes.RemoveExemplarSuccess:
      const removeExemplarNewState = {...state};
      const ownerCollection = removeExemplarNewState.entities[action.payload.exemplar.ownerId];
      ownerCollection.exemplars.splice(ownerCollection.exemplars.indexOf(action.payload.exemplar.exemplarId), 1);
      return removeExemplarNewState;

    // TODO replace by normalizr
    /**
     case BorrowingActionTypes.AddBorrowingSuccess:
     const addBorrowingNewState = {...state};
     const borrowerCollection = addBorrowingNewState.entities[action.payload.borrowing.borrowerId];
     borrowerCollection.borrowingRequests = borrowerCollection.borrowingRequests || [];
     borrowerCollection.borrowingRequests.push(action.payload.borrowing);
     return addBorrowingNewState;

     case BorrowingActionTypes.AcceptBorrowingSuccess:
     case BorrowingActionTypes.RejectBorrowingSuccess:
     const updateBorrowingNewState = {...state};
     const updateOwnerCollection = updateBorrowingNewState.entities[action.payload.borrowing.ownerId];

     const existingExemplar = updateOwnerCollection.exemplars
     .find((exemplar: Exemplar) => exemplar.exemplarId === action.payload.borrowing.exemplarId);
     const existingBorrowing = existingExemplar.borrowings
     .find((borrowing: Borrowing) => borrowing.borrowingId === action.payload.borrowing.borrowingId);

     existingExemplar.borrowings.splice(existingExemplar.borrowings.indexOf(existingBorrowing), 1);
     existingExemplar.borrowings.push(action.payload.borrowing);

     return collectionAdapter.upsertOne(updateOwnerCollection, state);

     case BorrowingActionTypes.ReceiveBorrowingSuccess:
     const receiveBorrowingNewState = {...state};
     const receiveBorrowerCollection = receiveBorrowingNewState.entities[action.payload.originalBorrowing.borrowerId];

     const newBorrowing = action.payload.exemplar.borrowings
     .find((borrowing: Borrowing) => borrowing.borrowingId === action.payload.originalBorrowing.borrowingId);

     const existingBorrowing1 = receiveBorrowerCollection.borrowingRequests
     .find((borrowingRequest: Borrowing) => borrowingRequest.borrowingId === newBorrowing.borrowingId);

     receiveBorrowerCollection.borrowingRequests
     .splice(receiveBorrowerCollection.borrowingRequests.indexOf(existingBorrowing1), 1);

     receiveBorrowerCollection.borrowedExemplars.push(action.payload.exemplar);

     const receiveOwnerCollection = receiveBorrowingNewState.entities[action.payload.exemplar.ownerId];
     const existingReceiveOwnerExemplar = receiveOwnerCollection.exemplars
     .find((exemplar: Exemplar) => exemplar.exemplarId === action.payload.exemplar.exemplarId);

     receiveOwnerCollection.exemplars.splice(receiveOwnerCollection.exemplars.indexOf(existingReceiveOwnerExemplar), 1);
     receiveOwnerCollection.exemplars.push({...action.payload.exemplar});

     receiveBorrowingNewState.entities[action.payload.exemplar.ownerId] = receiveOwnerCollection;

     return collectionAdapter.upsertMany([receiveOwnerCollection, receiveBorrowerCollection], state);

     case BorrowingActionTypes.CompleteBorrowingSuccess:
     const completeBorrowingNewState = {...state};
     const completeOwnerCollection = completeBorrowingNewState.entities[action.payload.exemplar.ownerId];

     const existingOwnerExemplar = completeOwnerCollection.exemplars
     .find((exemplar: Exemplar) => exemplar.exemplarId === action.payload.exemplar.exemplarId);

     completeOwnerCollection.exemplars.splice(completeOwnerCollection.exemplars.indexOf(existingOwnerExemplar), 1);
     completeOwnerCollection.exemplars.push({...action.payload.exemplar});

     completeBorrowingNewState.entities[action.payload.exemplar.ownerId] = completeOwnerCollection;

     return collectionAdapter.upsertOne(completeOwnerCollection, state);
     */
    default:
      return state;
  }
}

export const getCollectionState = createFeatureSelector<CollectionState>('collection');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = collectionAdapter.getSelectors(getCollectionState);

export const selectEntity = ownerId => createSelector(
  getCollectionState,
  (state: CollectionState) => state.entities[ownerId]
);


export const loggedInUserCollection = createSelector(
  getCollectionState,
  fromAuth.getLoggedUser,
  (collectionState, loggedUser) => loggedUser ? collectionState.entities[loggedUser.name] : null);

export const loggedInUserBorrowingRequests = createSelector(
  loggedInUserCollection,
  (collection) => collection ? collection.borrowingRequests : null);
