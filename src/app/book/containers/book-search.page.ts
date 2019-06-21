import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as actions from '../book.actions';
import * as fromBook from '../book.reducer';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import {Observable} from 'rxjs';
import {NavController, ToastController} from '@ionic/angular';
import {LoggedUser} from '../../auth/models/auth.model';
import {Book} from '../../common/book.model';

@Component({
  selector: 'book-search-page',
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
        <ion-title>Suche</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <app-book-search (search)="onSearch($event)"
                       (error)="onSearchError($event)"></app-book-search>

      <app-book-grid
        [books]="books$ | async"
        (bookSelected)="onBookSelected($event)"></app-book-grid>

      <div *ngIf="(books$ | async)?.length == 0" class="ion-text-center">
        <h2>Kein Ergebnis</h2>
        <p>Nutze die Suche um ein Buch zu finden und zu sehen wer es besitzt.</p>
        <img src="../../assets/img/empty_search.jpg"/>
      </div>
    </ion-content>
  `
})
export class BookSearchPage implements OnInit {

  books$: Observable<any>;
  user$: Observable<LoggedUser>;

  constructor(private store: Store<fromBook.BookState>,
              private navCtrl: NavController,
              private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.books$ = this.store.pipe(select(fromBook.getSearchResults));
    this.user$ = this.store.pipe(select(fromAuth.getLoggedUser));
  }

  onSearch(searchTerm: string) {
    if (searchTerm && searchTerm.trim().length > 0) {
      this.store.dispatch(new actions.SearchBooks(searchTerm));
    }
  }

  onSearchError(message: string) {
    this.showErrorMessage(message);
  }

  async showErrorMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  onBookSelected(book: Book) {
    this.navCtrl.navigateForward('/app/book/' + book.externalIdentifiers.gbooksId);
  }

  onAvatarClicked(event) {
    this.navCtrl.navigateRoot('/app/profile');
  }
}
