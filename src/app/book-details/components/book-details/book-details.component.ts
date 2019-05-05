import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

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
