import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../user/user.model';
import {Borrowing} from '../../../common/borrowing.model';

@Component({
  selector: 'app-exemplar-borrowing-list-item',
  templateUrl: './exemplar-borrowing-list-item.component.html',
  styleUrls: ['./exemplar-borrowing-list-item.component.scss'],
})
export class ExemplarBorrowingListItemComponent implements OnInit {

  Object = Object;

  @Input()
  borrowing: Borrowing;

  @Input()
  borrower: User;

  @Output()
  update = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  getActionIcon(action: string) {
    switch (action) {
      case 'accept':
        return ['thumbs-up'];
      case 'reject':
        return ['thumbs-down'];
      case 'receive':
        return ['book', 'swap'];
      case 'complete':
        return ['book', 'return-left'];
      default:
        return ['aperture'];
    }
  }

  getActionText(action: string) {
    switch (action) {
      case 'accept':
        return 'Annehmen';
      case 'reject':
        return 'Ablehnen';
      case 'receive':
        return 'Erhalten';
      case 'complete':
        return 'Zurückbekommen';
      default:
        return action;
    }
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

  onUpdateBorrowing(action) {
    this.update.emit(action);
  }

}
