import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvataaarsWrapperComponent} from './avataaars-wrapper.component';
import {IonicModule} from '@ionic/angular';

describe('AvataaarsWrapperComponent', () => {
  let component: AvataaarsWrapperComponent;
  let fixture: ComponentFixture<AvataaarsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [AvataaarsWrapperComponent]
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
