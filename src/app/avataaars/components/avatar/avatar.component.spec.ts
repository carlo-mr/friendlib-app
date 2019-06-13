import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvatarComponent} from './avatar.component';
import {AvataaarsWrapperComponent} from '../avataaars-wrapper/avataaars-wrapper.component';
import {IonicModule} from '@ionic/angular';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [AvatarComponent, AvataaarsWrapperComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
