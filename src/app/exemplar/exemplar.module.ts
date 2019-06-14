import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromExemplar from './exemplar.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('exemplar', fromExemplar.reducer)
  ]
})
export class ExemplarModule {
}
