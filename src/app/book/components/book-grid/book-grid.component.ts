import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../book.reducer';

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
