import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Borrowing} from '../../../common/borrowing.model';

@Component({
  selector: 'app-exemplar-borrowing-list',
  templateUrl: './exemplar-borrowing-list.component.html',
  styleUrls: ['./exemplar-borrowing-list.component.scss'],
})
export class ExemplarBorrowingListComponent implements OnInit {

  @Input()
  exemplarBorrowings: Borrowing[];

  @Output()
  exemplarBorrowingUpdate = new EventEmitter<{ borrowing: Borrowing, action: string }>();

  constructor() {
  }

  ngOnInit() {
  }

  onExemplarBorrowingUpdate(borrowing: Borrowing, action: string) {
    this.exemplarBorrowingUpdate.emit({borrowing: borrowing, action: action});
  }

}
