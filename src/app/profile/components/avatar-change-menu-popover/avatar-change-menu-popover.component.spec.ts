import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvatarChangeMenuPopoverComponent} from './avatar-change-menu-popover.component';
import {IonicModule} from '@ionic/angular';

describe('AvatarChangeMenuPopoverComponent', () => {
  let component: AvatarChangeMenuPopoverComponent;
  let fixture: ComponentFixture<AvatarChangeMenuPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvatarChangeMenuPopoverComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarChangeMenuPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
