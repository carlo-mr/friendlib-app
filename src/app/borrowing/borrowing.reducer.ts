import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Borrowing} from '../common/borrowing.model';
import {BorrowingActions, BorrowingActionTypes} from './borrowing.actions';
import * as fromAuth from '../auth/reducers/auth.reducer';
import {LoggedUser} from '../auth/models/auth.model';

export const borrowingAdapter = createEntityAdapter<Borrowing>({
  selectId: (borrowing: Borrowing) => borrowing.borrowingId,
  sortComparer: sortByStatus
});

export interface BorrowingState extends EntityState<Borrowing> {
}

const defaultState = {};

export const initialState: BorrowingState = borrowingAdapter.getInitialState(defaultState);

export function borrowingReducer(state: BorrowingState = initialState, action: BorrowingActions) {

  switch (action.type) {
    case BorrowingActionTypes.LoadBorrowingsSuccess:
      return borrowingAdapter.upsertMany(action.payload.borrowings, state);

    case BorrowingActionTypes.LoadExemplarBorrowingsSuccess:
      return borrowingAdapter.upsertMany(action.payload.borrowings, state);

    case BorrowingActionTypes.AddBorrowingSuccess:
      return borrowingAdapter.addOne(action.payload.borrowing, state);

    case BorrowingActionTypes.AcceptBorrowingSuccess:
    case BorrowingActionTypes.RejectBorrowingSuccess:
      return borrowingAdapter.upsertOne(action.payload.borrowing, state);

    case BorrowingActionTypes.UpdateBorrowingSuccess:
      action.payload.borrowing.status = action.payload.newStatus;
      action.payload.borrowing.updateDate = action.payload.updateDate;

      return borrowingAdapter.upsertOne(action.payload.borrowing, state);

    default:
      return state;
  }

}

export const getBorrowingState = createFeatureSelector<BorrowingState>('borrowing');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = borrowingAdapter.getSelectors(getBorrowingState);

export const selectEntity = id => createSelector(
  selectEntities,
  entities => entities[id]
);

export const selectBorrowingsForExemplarId = (exemplarId: string) => createSelector(
  selectAll,
  (borrowings: Borrowing[]) => borrowings.filter(borrowing => borrowing.exemplarId === exemplarId)
);

export const getBorrowingsOfLoggedInUser = (status: string) => createSelector(
  fromAuth.getLoggedUser,
  selectAll,
  (loggedUser: LoggedUser, allBorrowings: Borrowing[]) =>
    allBorrowings
      .filter((borrowing: Borrowing) => borrowing.borrowerId === loggedUser.name)
      .filter((borrowing: Borrowing) => borrowing.status === status)
);

export const selectEntityList = (ids: string[]) => createSelector(
  selectAll,
  (borrowings: Borrowing[]) => borrowings.filter(borrowing => ids.indexOf(borrowing.borrowingId) > -1)
);

export function sortByStatus(a: Borrowing, b: Borrowing): number {
  const aStatus = mapStatus(a.status);
  const bStatus = mapStatus(b.status);

  if (aStatus < bStatus) {
    return 1;
  } else if (aStatus > bStatus) {
    return -1;
  }

  return 0;
}

function mapStatus(status): number {
  switch (status) {
    case 'RECEIVED':
      return 4;
    case 'ACCEPTED':
      return 3;
    case 'OPEN':
      return 2;
    case 'COMPLETED':
      return 1;
    case 'REJECTED':
      return 0;
  }
}
