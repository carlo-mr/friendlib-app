import {Component, Input, OnInit} from '@angular/core';
import {Borrowing} from '../../common/borrowing.model';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-borrowing-popover',
  templateUrl: './borrowing-popover.component.html',
  styleUrls: ['./borrowing-popover.component.scss'],
})
export class BorrowingPopoverComponent implements OnInit {

  Object = Object;

  @Input()
  borrowing: Borrowing;

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
  }

  onUpdateBorrowing(action) {
    this.popoverCtrl.dismiss({action});
  }

}
