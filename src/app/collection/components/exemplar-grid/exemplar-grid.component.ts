import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Exemplar} from '../../../common/exemplar.model';
import {User} from '../../../user/user.model';

@Component({
  selector: 'app-exemplar-grid',
  templateUrl: './exemplar-grid.component.html'
})
export class ExemplarGridComponent implements OnInit {

  @Input() exemplars: Exemplar[];
  @Input() users: User[];

  @Output() exemplarSelected = new EventEmitter<Exemplar>();

  constructor() {
  }

  ngOnInit() {
  }

  selectExemplar(exemplar: Exemplar) {
    this.exemplarSelected.emit(exemplar);
  }

}
