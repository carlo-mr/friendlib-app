import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {borrowingReducer} from './borrowing.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BorrowingEffects} from './borrowing.effects';
import {AvataaarsModule} from '../avataaars/avataaars.module';
import {IonicModule} from '@ionic/angular';
import {BorrowingOverviewPage} from './containers/borrowing-overview.page';
import {RouterModule, Routes} from '@angular/router';
import {BorrowingListComponent} from './borrowing-list/borrowing-list.component';

const routes: Routes = [
  {
    path: '',
    component: BorrowingOverviewPage
  }
];

@NgModule({
  declarations: [
    BorrowingOverviewPage,
    BorrowingListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('borrowing', borrowingReducer),
    EffectsModule.forFeature([BorrowingEffects]),
    AvataaarsModule
  ]
})
export class BorrowingModule {
}
