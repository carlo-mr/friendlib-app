import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/guards/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: './auth/auth.module#AuthModule'},
  {path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
