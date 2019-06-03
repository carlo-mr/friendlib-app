import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BorrowingPopoverComponent} from './borrowing-popover.component';
import {IonicModule} from '@ionic/angular';

describe('BorrowingPopoverComponent', () => {
  let component: BorrowingPopoverComponent;
  let fixture: ComponentFixture<BorrowingPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [BorrowingPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowingPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
