import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../common/book.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @Input() book: Book;

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


}
