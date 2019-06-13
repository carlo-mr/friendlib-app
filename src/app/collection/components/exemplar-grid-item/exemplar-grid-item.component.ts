import {Component, Input, OnInit} from '@angular/core';
import {Borrowing} from '../../../common/borrowing.model';
import {User} from '../../../user/user.model';
import {Exemplar} from '../../../common/exemplar.model';

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

    .lent-to {
      position: absolute;
      bottom: 0px;
      right: 5px;
    }
  `],
  templateUrl: './exemplar-grid-item.component.html'
})
export class ExemplarGridItemComponent implements OnInit {

  @Input() exemplar: Exemplar;

  @Input() users: User[];

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
    return this.exemplar.borrowings.filter((borrowing: Borrowing) => borrowing.status === 'OPEN').length;
  }

}
