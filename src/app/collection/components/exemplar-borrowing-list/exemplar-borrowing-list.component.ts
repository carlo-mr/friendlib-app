import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from '@ngrx/entity';
import {User} from '../../../user/user.model';
import {Borrowing} from '../../../common/borrowing.model';
import {sortByStatus} from '../../../borrowing/borrowing.reducer';

@Component({
  selector: 'app-exemplar-borrowing-list',
  templateUrl: './exemplar-borrowing-list.component.html',
  styleUrls: ['./exemplar-borrowing-list.component.scss'],
})
export class ExemplarBorrowingListComponent implements OnInit {

  @Input()
  exemplarBorrowings: Borrowing[];

  @Input()
  users: Dictionary<User>;

  @Output()
  exemplarBorrowingUpdate = new EventEmitter<{ borrowing: Borrowing, action: string }>();

  constructor() {
  }

  ngOnInit() {
    if (this.exemplarBorrowings) {
      this.exemplarBorrowings.sort(sortByStatus);
    }
  }

  onExemplarBorrowingUpdate(borrowing: Borrowing, action: string) {
    this.exemplarBorrowingUpdate.emit({borrowing: borrowing, action: action});
  }

  countOpenBorrowings() {
    return this.exemplarBorrowings.filter((borrowing: Borrowing) => borrowing.status === 'OPEN').length;
  }

  private sortByStatus(a: Borrowing, b: Borrowing): number {
    const aStatus = this.mapStatus(a.status);
    const bStatus = this.mapStatus(b.status);

    if (aStatus < bStatus) {
      return 1;
    } else if (aStatus > bStatus) {
      return -1;
    }

    return 0;
  }

  private mapStatus(status): number {
    switch (status) {
      case 'RECEIVED':
        return 4;
      case 'ACCEPTED':
        return 3;
      case 'OPEN':
        return 2;
      case 'COMPLETED':
        return 1;
      case 'REJECTED':
        return 0;
    }
  }

}
