import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LoggedUser} from '../../../auth/models/auth.model';
import {Avataaars, AvataaarsConfig} from '../../../avataaars/components/avataaars-wrapper/avataaars-wrapper.component';


@Component({
  selector: 'app-selection-avatar-change',
  templateUrl: './selection-avatar-change.component.html'
})
export class SelectionAvatarChangeComponent implements OnInit, OnChanges {

  @Input() user: LoggedUser;

  @Output() change = new EventEmitter<{ avatar: AvataaarsConfig }>();

  private savedAvatar: AvataaarsConfig;

  Avataaars = Avataaars;
  Object = Object;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user && this.user.avatar) {
      this.savedAvatar = {...this.user.avatar} as AvataaarsConfig;
    }
  }

  save() {
    this.change.emit({avatar: this.user.avatar});
  }

  cancel() {
    this.change.emit({avatar: this.savedAvatar});
  }

  topTypeChanged(event) {
    this.user.avatar.topType = event.detail.value;
  }

  hairColorChanged(event) {
    this.user.avatar.hairColor = event.detail.value;
  }

  next(enumProperty, avatarProperty: string) {
    const keys = Object.keys(Avataaars[enumProperty]);
    const propertyValue = this.user.avatar[avatarProperty] || '';
    let index = keys.indexOf(propertyValue.toUpperCase());

    index++;
    if (index >= keys.length) {
      index = 0;
    }

    const next = keys[index];
    this.user.avatar[avatarProperty] = Avataaars[enumProperty][next];
  }

  prev(enumProperty, avatarProperty) {
    const keys = Object.keys(Avataaars[enumProperty]);
    const propertyValue = this.user.avatar[avatarProperty] || '';
    let index = keys.indexOf(propertyValue.toUpperCase());

    index--;
    if (index < 0) {
      index = keys.length - 1;
    }

    const prev = keys[index];
    this.user.avatar[avatarProperty] = Avataaars[enumProperty][prev];
  }
}
