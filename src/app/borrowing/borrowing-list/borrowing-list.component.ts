import {Component, Input, OnInit} from '@angular/core';
import {Borrowing} from '../../common/borrowing.model';

@Component({
  selector: 'app-borrowing-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.scss'],
})
export class BorrowingListComponent implements OnInit {

  @Input()
  borrowings: Borrowing[];

  constructor() {
  }

  ngOnInit() {
  }

}
