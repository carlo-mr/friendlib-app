import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {BookModule} from '../book/book.module';
import {CollectionModule} from '../collection/collection.module';
import {BorrowingModule} from '../borrowing/borrowing.module';
import {UserModule} from '../user/user.module';
import {ProfileModule} from '../profile/profile.module';
import {ExemplarModule} from '../exemplar/exemplar.module';
import {StoreModule} from '@ngrx/store';
import {Push} from '@ionic-native/push/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    BookModule,
    CollectionModule,
    BorrowingModule,
    UserModule,
    ProfileModule,
    ExemplarModule,
    StoreModule
  ],
  providers: [
    Push
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {
}
