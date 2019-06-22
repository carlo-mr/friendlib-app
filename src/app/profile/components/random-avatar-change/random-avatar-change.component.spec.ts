import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RandomAvatarChangeComponent} from './random-avatar-change.component';
import {AvataaarsModule} from '../../../avataaars/avataaars.module';
import {IonicModule} from '@ionic/angular';

describe('AvatarChangeComponent', () => {
  let component: RandomAvatarChangeComponent;
  let fixture: ComponentFixture<RandomAvatarChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AvataaarsModule, IonicModule],
      declarations: [RandomAvatarChangeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomAvatarChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
