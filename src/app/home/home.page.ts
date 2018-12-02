import {Component} from '@angular/core';
import {State} from '../reducers';
import {Store} from '@ngrx/store';
import {Logout} from '../auth/actions/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private store: Store<State>) {
  }

  onLogoutClicked(event) {
    this.store.dispatch(new Logout({}));
  }
}
