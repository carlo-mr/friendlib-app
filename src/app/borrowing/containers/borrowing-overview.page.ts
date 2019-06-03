import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NavController} from '@ionic/angular';
import {LoggedUser} from '../../auth/models/auth.model';
import * as fromBorrowing from '../borrowing.reducer';
import {ActivatedRoute} from '@angular/router';
import {LoadBorrowings} from '../borrowing.actions';
import {Borrowing} from '../../common/borrowing.model';

@Component({
  selector: 'borrowing-overview-page',
  styles: [`.avatar-small {
    width: 40px;
    height: 40px;
  }`],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <app-avatar class="avatar-small"
                      [user]="this.user$ | async"
                      (click)="onAvatarClicked($event)"></app-avatar>
        </ion-buttons>
        <ion-title>Leihen</ion-title>
        <ion-buttons slot="end">

        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ng-container *ngIf="(borrowings$ | async)?.length > 0">
        <app-borrowing-list [borrowings]="borrowings$ | async">

        </app-borrowing-list>
      </ng-container>
    </ion-content>
  `
})
export class BorrowingOverviewPage implements OnInit {

  borrowings$: Observable<Borrowing[]>;
  user$: Observable<LoggedUser>;

  constructor(private store: Store<fromBorrowing.BorrowingState>,
              private navCtrl: NavController,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));
    this.borrowings$ = this.store.pipe(select(fromBorrowing.selectAll));
    this.store.dispatch(new LoadBorrowings());
  }

  onAvatarClicked(event) {
    this.navCtrl.navigateRoot('/app/profile');
  }

}
