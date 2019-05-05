import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookSearchComponent} from './components/book-search/book-search.component';
import {StoreModule} from '@ngrx/store';
import {bookReducer} from './book.reducer';
import {BookSearchPage} from './containers/book-search.page';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {BookEffects} from './book.effects';
import {IonicModule} from '@ionic/angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {HttpClientModule} from '@angular/common/http';
import {BookGridComponent} from './components/book-grid/book-grid.component';
import {BookDetailsPage} from './containers/book-details.page';
import {BookExistsGuard} from './guards/book-exists.guard';
import {AvataaarsModule} from '../avataaars/avataaars.module';
import {BookDetailsModule} from '../book-details/book-details.module';
import {BookLinksComponent} from './components/book-links/book-links.component';

const routes: Routes = [
  {
    path: '',
    component: BookSearchPage
  },
  {
    path: ':id',
    component: BookDetailsPage,
    canActivate: [BookExistsGuard]
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('book', bookReducer),
    EffectsModule.forFeature([BookEffects]),
    AvataaarsModule,
    BookDetailsModule
  ],
  providers: [BarcodeScanner],
  declarations: [BookSearchComponent, BookSearchPage, BookGridComponent, BookDetailsPage, BookLinksComponent]
})
export class BookModule {
}
