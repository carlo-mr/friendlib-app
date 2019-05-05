import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromCollection from './reducers/collection.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CollectionEffects} from './effects/collection.effects';
import {AvataaarsModule} from '../avataaars/avataaars.module';
import {RouterModule, Routes} from '@angular/router';
import {CollectionDetailsPage} from './containers/collection-details.page';
import {IonicModule} from '@ionic/angular';
import {ExemplarGridComponent} from './components/exemplar-grid/exemplar-grid.component';
import {ExemplarDetailsPage} from './containers/exemplar-details.page';
import {BookDetailsModule} from '../book-details/book-details.module';
import {ExemplarLinksComponent} from './components/exemplar-links/exemplar-links.component';
import {CollectionExistsGuard} from './guards/collection-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: CollectionDetailsPage
  },
  {
    path: ':ownerId',
    component: CollectionDetailsPage,
    canActivate: [CollectionExistsGuard]
  },
  {
    path: ':ownerId/:exemplarId',
    component: ExemplarDetailsPage,
    canActivate: [CollectionExistsGuard]
  }
];

@NgModule({
  declarations: [CollectionDetailsPage, ExemplarGridComponent, ExemplarDetailsPage, ExemplarLinksComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('collection', fromCollection.collectionReducer),
    EffectsModule.forFeature([CollectionEffects]),
    AvataaarsModule,
    BookDetailsModule
  ]
})
export class CollectionModule {
}
