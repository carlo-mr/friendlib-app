import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-book-actions-popover',
  templateUrl: './book-actions-popover.component.html',
  styleUrls: ['./book-actions-popover.component.scss'],
})
export class BookActionsPopoverComponent implements OnInit {

  @Input() book$: Observable<Book>;

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
  }

  onAddToCollection(book) {
    this.popoverCtrl.dismiss({addToCollection: book});
  }

}
