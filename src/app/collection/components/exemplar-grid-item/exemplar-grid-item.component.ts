import {Component, Input, OnInit} from '@angular/core';
import {Exemplar} from '../../../common/collection.model';

@Component({
  selector: 'app-exemplar-grid-item',
  styles: [`
    .hidden {
      display: none;
    }

    .block {
      display: block;
    }
  `],
  templateUrl: './exemplar-grid-item.component.html'
})
export class ExemplarGridItemComponent implements OnInit {

  @Input() exemplar: Exemplar;

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
