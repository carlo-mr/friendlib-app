import {Component, EventEmitter, Output} from '@angular/core';
import {LoginDetails} from '../../models/auth.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  @Output()
  login = new EventEmitter<LoginDetails>();

  onSubmit() {
    if (this.loginForm.valid) {
      this.login.emit(this.loginForm.getRawValue());
    }
  }

  isControlInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

}
