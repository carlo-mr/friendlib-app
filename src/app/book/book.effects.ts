import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LoadingController} from '@ionic/angular';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {BookActionTypes, SearchBookError, SearchBooks, SearchBooksSuccess} from './book.actions';
import {BookService} from './book.service';
import * as fromBook from './book.reducer';

@Injectable()
export class BookEffects {

  @Effect()
  searchBooks$ = this.actions$.pipe(
    ofType(BookActionTypes.SearchBooks),
    switchMap((action: SearchBooks) => {
        return this.bookService.search(action.searchTerm).pipe(
          map((response: any) => {
            return new SearchBooksSuccess(response.books);
          }),
          catchError((error) => {
            return of(new SearchBookError(error.message));
          })
        );
      }
    )
  );

  @Effect({dispatch: false})
  createLoadingOnSearchBooks$ = this.actions$.pipe(
    ofType(BookActionTypes.SearchBooks),
    switchMap(async (action: SearchBooks) => {
      const loading = await this.loadingCtrl.create();

      this.loading = loading;
      loading.present();
    })
  );

  @Effect({dispatch: false})
  dismissLoadingOnSearchBooks$ = this.actions$.pipe(
    ofType(BookActionTypes.SearchBooksSuccess,
      BookActionTypes.SearchBooksError),
    map(() => {
      if (this.loading) {
        this.loading.dismiss();
      }
    })
  );

  private loading: any;

  constructor(private actions$: Actions,
              private store$: Store<fromBook.BookState>,
              private bookService: BookService,
              private loadingCtrl: LoadingController) {
  }
}
