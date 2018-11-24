import {Component, EventEmitter, Output} from '@angular/core';
import {RegisterDetails} from '../../models/auth.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  @Output()
  register = new EventEmitter<RegisterDetails>();

  onSubmit() {
    this.register.emit(this.registerForm.getRawValue());
  }

  isControlInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

}
