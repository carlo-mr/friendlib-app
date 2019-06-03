import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {IonicModule} from '@ionic/angular';
import {CollapsiblePanelComponent} from './collapsible-panel/collapsible-panel.component';

@NgModule({
  declarations: [BookDetailsComponent, CollapsiblePanelComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BookDetailsComponent, CollapsiblePanelComponent]
})
export class BookDetailsModule {
}
