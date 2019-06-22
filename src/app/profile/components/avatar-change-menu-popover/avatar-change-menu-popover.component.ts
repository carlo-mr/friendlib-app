import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-avatar-change-menu-popover',
  templateUrl: './avatar-change-menu-popover.component.html',
  styleUrls: ['./avatar-change-menu-popover.component.scss'],
})
export class AvatarChangeMenuPopoverComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
  }

  close(type) {
    this.popoverCtrl.dismiss({type});
  }

}
