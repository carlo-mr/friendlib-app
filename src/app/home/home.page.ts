import {Component} from '@angular/core';
import {State} from '../reducers';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private store: Store<State>) {
  }
}
