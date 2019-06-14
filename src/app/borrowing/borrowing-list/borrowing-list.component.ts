import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Borrowing} from '../../common/borrowing.model';
import {User} from '../../user/user.model';
import {Dictionary} from '@ngrx/entity';

@Component({
  selector: 'app-borrowing-list',
  templateUrl: './borrowing-list.component.html',
  styleUrls: ['./borrowing-list.component.scss'],
})
export class BorrowingListComponent implements OnInit {

  @Input()
  borrowings: Borrowing[];

  @Input()
  users: Dictionary<User>;

  @Output()
  selectExemplar = new EventEmitter<{ exemplarId: string, ownerId: string }>();

  constructor() {
  }

  ngOnInit() {
  }

  getStatusText(status: string) {
    switch (status) {
      case 'OPEN':
        return 'Offen';
      case 'RECEIVED':
        return 'Ausgeliehen';
      case 'ACCEPTED':
        return 'Angenommen';
      case 'REJECTED':
        return 'Abgelehnt';
      case 'COMPLETED':
        return 'Abgeschlossen';
    }
  }

  onBorrowingSelected(borrowing: Borrowing) {
    this.selectExemplar.emit({exemplarId: borrowing.exemplarId, ownerId: borrowing.ownerId});
  }

}
