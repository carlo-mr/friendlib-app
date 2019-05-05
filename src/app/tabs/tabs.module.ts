import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {HomePageModule} from '../home/home.module';
import {BookModule} from '../book/book.module';
import {CollectionModule} from '../collection/collection.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HomePageModule,
    BookModule,
    CollectionModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
}
