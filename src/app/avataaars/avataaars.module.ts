import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AvataaarsWrapperComponent} from './components/avataaars-wrapper/avataaars-wrapper.component';
import {AvatarComponent} from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    AvataaarsWrapperComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvataaarsWrapperComponent,
    AvatarComponent
  ]
})
export class AvataaarsModule {
}
