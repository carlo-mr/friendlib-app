import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NewPasswordDetails} from '../../models/auth.model';

@Component({
  selector: 'auth-forgotpassword',
  templateUrl: './forgotpassword.component.html'
})
export class ForgotpasswordComponent {

  formGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    verificationCode: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  @Input()
  forgotPasswordCodeSent: boolean;

  @Output()
  newPassword = new EventEmitter<NewPasswordDetails>();

  @Output()
  requestCode = new EventEmitter<string>();

  onSubmit() {
    if (this.forgotPasswordCodeSent) {
      this.newPassword.emit({
        userName: this.formGroup.get('userName').value,
        verificationCode: this.formGroup.get('verificationCode').value,
        password: this.formGroup.get('password').value
      });
    } else {
      this.requestCode.emit(this.formGroup.get('userName').value);
    }
  }

  isControlInvalid(controlName: string) {
    const control = this.formGroup.get(controlName);
    if (control) {
      return control.invalid && (control.dirty || control.touched);
    }
    return false;
  }

}
