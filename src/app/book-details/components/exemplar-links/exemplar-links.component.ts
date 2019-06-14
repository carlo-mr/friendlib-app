import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Exemplar} from '../../../common/exemplar.model';
import {LoggedUser} from '../../../auth/models/auth.model';

@Component({
  selector: 'app-exemplar-links',
  templateUrl: './exemplar-links.component.html',
  styleUrls: ['./exemplar-links.component.scss'],
})
export class ExemplarLinksComponent implements OnInit, OnChanges {

  @Input() exemplar: Exemplar;

  @Input() user: LoggedUser;

  @Output() removeExemplar = new EventEmitter<Exemplar>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteExemplar() {
    this.removeExemplar.emit(this.exemplar);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ExemplarLinksComponent onChanges');
  }

}
