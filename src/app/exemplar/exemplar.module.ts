import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromExemplar from './exemplar.reducer';
import {ExemplarEffects} from './exemplar.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('exemplar', fromExemplar.reducer)
  ]
})
export class ExemplarModule {
}
