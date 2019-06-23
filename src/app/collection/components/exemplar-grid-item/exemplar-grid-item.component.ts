import {Component, Input, OnInit} from '@angular/core';
import {Borrowing} from '../../../common/borrowing.model';
import {User} from '../../../user/user.model';
import {Exemplar} from '../../../common/exemplar.model';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-exemplar-grid-item',
  styles: [`
    .hidden {
      display: none;
    }

    .block {
      display: block;
    }

    ion-badge {
      position: absolute;
      right: 5px;
      top: -5px;
    }

    .user-overlay {
      position: absolute;
      bottom: 0;
      right: 5px;
    }
  `],
  templateUrl: './exemplar-grid-item.component.html'
})
export class ExemplarGridItemComponent implements OnInit {

  @Input() exemplar: Exemplar;
  @Input() book: Book;
  @Input() borrowings: Borrowing[];
  @Input() overlayUser: User;

  imgClass = 'hidden';
  skeletonClass = 'block';

  constructor() {
  }

  ngOnInit() {
  }

  onImageLoad(event) {
    this.imgClass = 'block';
    this.skeletonClass = 'hidden';
  }

  countOpenBorrowings() {
    if (this.borrowings && this.exemplar) {
      return this.borrowings
        .filter((borrowing: Borrowing) => borrowing.status === 'OPEN')
        .filter((borrowing: Borrowing) => this.exemplar.borrowings.indexOf(borrowing.borrowingId) > -1)
        .length;
    }
    return 0;
  }

}
