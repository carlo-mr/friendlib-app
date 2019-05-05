import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exemplar} from '../../../common/collection.model';

@Component({
  selector: 'app-exemplar-grid',
  templateUrl: './exemplar-grid.component.html'
})
export class ExemplarGridComponent implements OnInit {

  @Input() exemplars: Exemplar[];

  @Output() exemplarSelected = new EventEmitter<Exemplar>();

  constructor() {
  }

  ngOnInit() {
  }

  selectExemplar(exemplar: Exemplar) {
    this.exemplarSelected.emit(exemplar);
  }

}
