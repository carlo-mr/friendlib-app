import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Notification} from './notification.model';
import {NotificationActions, NotificationActionTypes} from './notification.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface NotificationState extends EntityState<Notification> {
  // additional entities state properties
  loading: boolean;
}

export const adapter: EntityAdapter<Notification> = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});

export const initialState: NotificationState = adapter.getInitialState({
  // additional entity state properties
  loading: false
});

export function notificationReducer(
  state = initialState,
  action: NotificationActions
): NotificationState {
  switch (action.type) {
    case NotificationActionTypes.LoadNotifications:
      return {...state, loading: true};

    case NotificationActionTypes.LoadNotificationsError:
      return {...state, loading: false};


    case NotificationActionTypes.LoadNotificationsSuccess:
      return adapter.addAll(action.payload.notifications, {...state, loading: false});

    default: {
      return state;
    }
  }
}

export const getNotificationState = createFeatureSelector<NotificationState>('notification');


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(getNotificationState);

export const getNotificationLoading = createSelector(
  getNotificationState,
  (notificationState: NotificationState) => notificationState.loading
);
