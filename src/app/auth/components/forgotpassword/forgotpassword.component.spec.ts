import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgotpasswordComponent} from './forgotpassword.component';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

describe('ForgotPasswordComponent', () => {
  let component: ForgotpasswordComponent;
  let fixture: ComponentFixture<ForgotpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, IonicModule],
      declarations: [ForgotpasswordComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
