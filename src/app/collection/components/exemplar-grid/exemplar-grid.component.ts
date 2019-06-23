import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exemplar} from '../../../common/exemplar.model';
import {User} from '../../../user/user.model';
import {Borrowing} from '../../../common/borrowing.model';
import {Dictionary} from '@ngrx/entity';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-exemplar-grid',
  templateUrl: './exemplar-grid.component.html'
})
export class ExemplarGridComponent implements OnInit {

  @Input() exemplars: Exemplar[];
  @Input() borrowings: Borrowing[];

  @Input() users: Dictionary<User>;
  @Input() books: Book[];
  @Input() type: string;

  @Output() exemplarSelected = new EventEmitter<Exemplar>();

  constructor() {
  }

  ngOnInit() {
  }

  selectExemplar(exemplar: Exemplar) {
    this.exemplarSelected.emit(exemplar);
  }

  findBook(exemplar: Exemplar): Book {
    return this.books ? this.books.find((book: Book) => book.bookId === exemplar.book) : null;
  }

}
