import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Notification} from './notification.model';
import {NotificationActions, NotificationActionTypes} from './notification.actions';
import {createFeatureSelector} from '@ngrx/store';

export interface NotificationState extends EntityState<Notification> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Notification> = createEntityAdapter<Notification>();

export const initialState: NotificationState = adapter.getInitialState({
  // additional entity state properties
});

export function notificationReducer(
  state = initialState,
  action: NotificationActions
): NotificationState {
  switch (action.type) {
    case NotificationActionTypes.LoadNotificationsSuccess: {
      return adapter.addAll(action.payload.notifications, state);
    }

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
