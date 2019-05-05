import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BookDetailsComponent]
})
export class BookDetailsModule {
}
