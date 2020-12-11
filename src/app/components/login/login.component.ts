import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]   ),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  submitForm(){
    this.loggerFormInfo();
  }

  loggerFormInfo(){
    console.log("---------------------------------------------------");
    this.loginForm.get('email')?.status === 'VALID' ? console.log("Email OK") : console.error("Email KO");
    this.loginForm.get('password')?.status === 'VALID' ? console.log("Password OK") : console.error("Password KO");
    /* Form Validation */
    this.loginForm?.status === 'VALID' ? console.log("Form OK") : console.error("Form KO");
    console.log("---------------------------------------------------");
  }

  constructor(formBuilder : FormBuilder) { }

  ngOnInit(): void {

  }

}
