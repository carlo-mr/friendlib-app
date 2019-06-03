import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfileModule'
          }
        ]
      },
      {
        path: 'collection',
        children: [
          {
            path: '',
            loadChildren: '../collection/collection.module#CollectionModule'
          }
        ]
      },
      {
        path: 'book',
        children: [
          {
            path: '',
            loadChildren: '../book/book.module#BookModule'
          }
        ]
      },
      {
        path: 'borrowing',
        children: [
          {
            path: '',
            loadChildren: '../borrowing/borrowing.module#BorrowingModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/collection',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/collection',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
