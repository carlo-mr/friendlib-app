import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginDetails} from '../../models/auth.model';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  @Output()
  login = new EventEmitter<LoginDetails>();

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.login.emit(this.loginForm.getRawValue());
  }

}
