import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {LoggedUser} from '../../../auth/models/auth.model';
import {Exemplar} from '../../../common/exemplar.model';

@Component({
  selector: 'app-exemplar-actions-popover',
  templateUrl: './exemplar-actions-popover.component.html',
  styleUrls: ['./exemplar-actions-popover.component.scss'],
})
export class ExemplarActionsPopoverComponent implements OnInit {

  @Input() exemplar$: Observable<Exemplar>;

  @Input() user$: Observable<LoggedUser>;

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
  }

  deleteExemplar(exemplar) {
    this.popoverCtrl.dismiss({deleteExemplar: exemplar});
  }

}
