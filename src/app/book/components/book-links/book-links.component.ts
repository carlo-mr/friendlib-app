import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-book-links',
  templateUrl: './book-links.component.html'
})
export class BookLinksComponent implements OnInit {

  @Input() book: Book;

  @Output() addToCollection = new EventEmitter<Book>();

  constructor() {
  }

  ngOnInit() {
  }

  addToCollectionClicked(event) {
    this.addToCollection.emit(this.book);
  }

}
