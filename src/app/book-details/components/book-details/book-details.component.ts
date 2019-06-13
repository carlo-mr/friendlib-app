import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book, BookOwner} from '../../../common/book.model';
import {User} from '../../../user/user.model';
import {Dictionary} from '@ngrx/entity';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book;
  @Input() users: Dictionary<User>;

  @Output() loadDescription = new EventEmitter<{ gbooksId?: string, bookId?: string }>();
  @Output() borrowRequest = new EventEmitter<{ book: Book, bookOwner: BookOwner }>();

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

  onBorrowRequest(bookOwner) {
    this.borrowRequest.emit({book: this.book, bookOwner: bookOwner});
  }

  onDescriptionPanelToggled() {
    if (!this.book.description) {
      this.loadDescription.emit({gbooksId: this.book.externalIdentifiers.gbooksId});
    }
  }

}
