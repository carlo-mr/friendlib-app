import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {IonicModule} from '@ionic/angular';
import {CollapsiblePanelComponent} from './collapsible-panel/collapsible-panel.component';
import {BorrowingPopoverComponent} from './borrowing-popover/borrowing-popover.component';
import {ExemplarLinksComponent} from './components/exemplar-links/exemplar-links.component';
import {ExemplarActionsPopoverComponent} from './components/exemplar-actions-popover/exemplar-actions-popover.component';
import {AvataaarsModule} from '../avataaars/avataaars.module';

@NgModule({
  declarations: [
    BookDetailsComponent,
    CollapsiblePanelComponent,
    BorrowingPopoverComponent,
    ExemplarLinksComponent,
    ExemplarActionsPopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AvataaarsModule
  ],
  exports: [
    BookDetailsComponent,
    CollapsiblePanelComponent,
    BorrowingPopoverComponent,
    ExemplarLinksComponent,
    ExemplarActionsPopoverComponent
  ],
  entryComponents: [BorrowingPopoverComponent, ExemplarActionsPopoverComponent]
})
export class BookDetailsModule {
}
