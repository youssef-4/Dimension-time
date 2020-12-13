import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // ! Check if the button of Form loginForm it's submit or not
  sumitted = false;
  loginForm: FormGroup;

  constructor() {
    // ! Validaciones del formulario loginForm
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // ! Verificación del formulario loginForm
  submitForm(): void {
    this.sumitted = true;
    if (this.loginForm.valid === true){
      console.log('Send form to firebase');
    }
  }

  // ! Change color of the input with BootStrap class is-valid or is-invalid
  formInputColor(field: string): string {
    if (this.sumitted === true) {
      if (this.loginForm?.get(field)?.status === 'VALID') {
        return 'is-valid';
      }
    } else if (this.sumitted === false) {
      return ' ';
    }
    return 'is-invalid';
  }

  // ! Msg color return true or false for make the message visible or hidden
  msgColor(field: string): boolean {
    if (this.sumitted === true) {
      if (this.loginForm?.get(field)?.status === 'VALID') {
        return false;
      }
    } else if (this.sumitted === false) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {}
}
