import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookSearchComponent} from './components/book-search/book-search.component';
import {StoreModule} from '@ngrx/store';
import {bookReducer} from './book.reducer';
import {BookSearchPage} from './containers/booksearch.page';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {BookEffects} from './book.effects';

const routes: Routes = [
  {
    path: '',
    component: BookSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('book', bookReducer),
    EffectsModule.forFeature([BookEffects])
  ],
  declarations: [BookSearchComponent, BookSearchPage]
})
export class BookModule {
}
