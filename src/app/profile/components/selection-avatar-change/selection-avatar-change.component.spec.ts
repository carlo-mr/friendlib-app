import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectionAvatarChangeComponent} from './selection-avatar-change.component';
import {AvataaarsModule} from '../../../avataaars/avataaars.module';
import {IonicModule} from '@ionic/angular';

describe('AvatarChangeComponent', () => {
  let component: SelectionAvatarChangeComponent;
  let fixture: ComponentFixture<SelectionAvatarChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AvataaarsModule, IonicModule],
      declarations: [SelectionAvatarChangeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionAvatarChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
