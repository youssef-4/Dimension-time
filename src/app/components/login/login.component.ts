import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // ! Check if the button of Form loginForm it's submit or not
  sumitted = false;

  // ! Validaciones del formulario loginForm
  loginForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]
    ),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    )
  });

  // ! Verificación del formulario loginForm
  submitForm(): void{
    this.loggerFormAndFieldsInfo();
    this.sumitted = true;
  }

  // TODO : INPUT DESCRIPTION
  loggerFormAndFieldsInfo(): void{
    console.log('---------------------------------------------------');
    // ! Email Field Validation Result
    this.loginForm.get('email')?.status === 'VALID' ? console.log('Email OK') : console.error('Email KO');
    // ! Password Field Validation
    this.loginForm.get('password')?.status === 'VALID' ? console.log('Password OK') : console.error('Password KO');
    // ! Form Validation Result
    this.loginForm?.status === 'VALID' ? console.log('Form OK') : console.error('Form KO');
    console.log('---------------------------------------------------');
  }

  // ! Change color of the input with BootStrap class is-valid or is-invalid
  formInputColor(field: string): string{
    if (this.sumitted === true){
      if (this.loginForm?.get(field)?.status === 'VALID'){
        return 'is-valid';
      }
    } else if (this.sumitted === false){
      return ' ';
    }
    return 'is-invalid';
  }

  // ! Msg color return true or false for make the message visible or hidden
  msgColor(field: string): boolean{
    if (this.sumitted === true){
      if (this.loginForm?.get(field)?.status === 'VALID'){
        return false;
      }
    } else if (this.sumitted === false){
      return false;
    }
    return true;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
