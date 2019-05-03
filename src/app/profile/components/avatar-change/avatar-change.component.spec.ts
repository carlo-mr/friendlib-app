import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvatarChangeComponent} from './avatar-change.component';
import {AvataaarsModule} from '../../../avataaars/avataaars.module';
import {IonicModule} from '@ionic/angular';

describe('AvatarChangeComponent', () => {
  let component: AvatarChangeComponent;
  let fixture: ComponentFixture<AvatarChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AvataaarsModule, IonicModule],
      declarations: [AvatarChangeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
