import {Component, Input, OnInit} from '@angular/core';
import {LoggedUser} from '../../../auth/models/auth.model';

@Component({
  selector: 'app-avatar',
  template: `
    <app-avataaars-wrapper *ngIf="user"
                           [avataaarsConfig]="user.avatar"></app-avataaars-wrapper>
  `
})
export class AvatarComponent implements OnInit {

  @Input() user: LoggedUser;

  constructor() {
  }

  ngOnInit() {
  }

}
