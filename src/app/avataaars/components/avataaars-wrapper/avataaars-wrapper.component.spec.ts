import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvataaarsWrapperComponent } from './avataaars-wrapper.component';

describe('AvataaarsWrapperComponent', () => {
  let component: AvataaarsWrapperComponent;
  let fixture: ComponentFixture<AvataaarsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvataaarsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvataaarsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
