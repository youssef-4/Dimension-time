import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sumitted = false;

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

  submitForm(): void{
    this.loggerFormAndFieldsInfo();
    this.sumitted = true;
  }

  loggerFormAndFieldsInfo(): void{
    console.log('---------------------------------------------------');
    this.loginForm.get('email')?.status === 'VALID' ? console.log('Email OK') : console.error('Email KO');
    this.loginForm.get('password')?.status === 'VALID' ? console.log('Password OK') : console.error('Password KO');
    /* Form Validation */
    this.loginForm?.status === 'VALID' ? console.log('Form OK') : console.error('Form KO');
    console.log('---------------------------------------------------');
  }

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
