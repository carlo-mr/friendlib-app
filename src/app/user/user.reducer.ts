import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {User} from './user.model';
import {UserActions, UserActionTypes} from './user.actions';
import {createFeatureSelector} from '@ngrx/store';

export interface UserState extends EntityState<User> {
  // additional entities state properties
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

const defaultState = {};

export const initialState: UserState = userAdapter.getInitialState(defaultState);

export function userReducer(
  state = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.AddUser: {
      return userAdapter.addOne(action.payload.user, state);
    }

    case UserActionTypes.UpsertUser: {
      return userAdapter.upsertOne(action.payload.user, state);
    }

    case UserActionTypes.AddUsers: {
      return userAdapter.addMany(action.payload.users, state);
    }

    case UserActionTypes.UpsertUsers: {
      return userAdapter.upsertMany(action.payload.users, state);
    }

    case UserActionTypes.UpdateUser: {
      return userAdapter.updateOne(action.payload.user, state);
    }

    case UserActionTypes.UpdateUsers: {
      return userAdapter.updateMany(action.payload.users, state);
    }

    case UserActionTypes.DeleteUser: {
      return userAdapter.removeOne(action.payload.id, state);
    }

    case UserActionTypes.DeleteUsers: {
      return userAdapter.removeMany(action.payload.ids, state);
    }

    case UserActionTypes.LoadUsersSuccess: {
      return userAdapter.addAll(action.payload.users, state);
    }

    case UserActionTypes.ClearUsers: {
      return userAdapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getUserState = createFeatureSelector<UserState>('user');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userAdapter.getSelectors(getUserState);
