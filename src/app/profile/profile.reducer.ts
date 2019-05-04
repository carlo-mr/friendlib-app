import {createFeatureSelector} from '@ngrx/store';
import {ProfileActions} from './profile.actions';

export interface ProfileState {
  dummy: any;
}

const defaultState = {
  dummy: {}
};

export const initialState: ProfileState = defaultState;

export function profileReducer(state: ProfileState = initialState, action: ProfileActions) {

  return state;
}

export const getProfileState = createFeatureSelector<ProfileState>('profile');
