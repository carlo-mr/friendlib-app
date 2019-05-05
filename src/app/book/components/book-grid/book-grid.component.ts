import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-book-grid',
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
    console.log('book selected', book);
    this.bookSelected.emit(book);
  }

}
