import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notification} from '../../notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit {

  @Input()
  notifications: Notification[];

  @Output()
  refresh = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {

  }

}
