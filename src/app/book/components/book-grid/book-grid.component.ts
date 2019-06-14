import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-book-grid',
  styles: [`
    ion-badge {
      position: absolute;
      right: 5px;
      top: -5px;
    }
  `],
  templateUrl: './book-grid.component.html'
})
export class BookGridComponent implements OnInit {

  @Input() books: Book[];

  @Output() bookSelected = new EventEmitter<Book>();

  constructor() {
  }

  ngOnInit() {
  }

  selectBook(book: Book) {
    this.bookSelected.emit(book);
  }

}
