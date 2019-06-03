import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book, BookOwner} from '../../../common/book.model';

@Component({
  selector: 'app-book-links',
  templateUrl: './book-links.component.html'
})
export class BookLinksComponent implements OnInit {

  @Input() book: Book;

  @Output() addToCollection = new EventEmitter<Book>();
  @Output() borrowRequest = new EventEmitter<BookOwner>();

  constructor() {
  }

  ngOnInit() {
  }

  addToCollectionClicked(event) {
    this.addToCollection.emit(this.book);
  }

  borrowRequestClicked(bookOwner) {
    this.borrowRequest.emit(bookOwner);
  }

}
