import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {LoadingController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import * as fromProfile from './profile.reducer';

@Injectable()
export class ProfileEffects {

  constructor(private actions$: Actions,
              private store$: Store<fromProfile.ProfileState>,
              private loadingCtrl: LoadingController) {
  }
}
