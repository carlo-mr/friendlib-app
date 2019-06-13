import {Action} from '@ngrx/store';
import {Notification} from './notification.model';

export enum NotificationActionTypes {
  LoadNotifications = '[Notification] Load Notifications',
  LoadNotificationsSuccess = '[Notification] Load Notifications Success',
  LoadNotificationsError = '[Notification] Load Notifications Error',
}

export class LoadNotifications implements Action {
  readonly type = NotificationActionTypes.LoadNotifications;

  constructor(public payload: { refresher?: any }) {
  }
}

export class LoadNotificationsSuccess implements Action {
  readonly type = NotificationActionTypes.LoadNotificationsSuccess;

  constructor(public payload: { notifications: Notification[] }) {
  }
}

export class LoadNotificationsError implements Action {
  readonly type = NotificationActionTypes.LoadNotificationsError;

  constructor(public payload: { errorMessage: string }) {
  }
}


export type NotificationActions =
  LoadNotifications
  | LoadNotificationsSuccess
  | LoadNotificationsError;
