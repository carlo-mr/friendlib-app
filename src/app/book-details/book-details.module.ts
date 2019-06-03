import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {IonicModule} from '@ionic/angular';
import {CollapsiblePanelComponent} from './collapsible-panel/collapsible-panel.component';
import {BorrowingPopoverComponent} from './borrowing-popover/borrowing-popover.component';

@NgModule({
  declarations: [BookDetailsComponent, CollapsiblePanelComponent, BorrowingPopoverComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [BookDetailsComponent, CollapsiblePanelComponent, BorrowingPopoverComponent],
  entryComponents: [BorrowingPopoverComponent]
})
export class BookDetailsModule {
}
