import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  icon = 'far fa-eye';

  changeIcon(): void {
    this.icon === 'far fa-eye'
    ?
      this.icon = 'far fa-eye-slash'
    :
      this.icon = 'far fa-eye';

    console.log('Pasword icon changed to ' + this.icon);

    this.changePassword('iamapassword');
  }

  changePassword(idInput: string): void{
    const maybeMyElement = document.getElementById(idInput);
    if (maybeMyElement?.getAttribute('type') === 'text'){
      maybeMyElement?.setAttribute('type', 'password');
    } else{
      maybeMyElement?.setAttribute('type', 'text');
    }
  }
  // tslint:disable-next-line: member-ordering
  showPasswordOption = false;
  visible($event: any): boolean{
    console.log($event);
    console.log($event.key);
    console.log($event.target);
    const item = document.getElementById($event.target.id) as HTMLInputElement;
    if (item?.value.length > 0){
      this.showPasswordOption = true;
      return true;
    }else{
      this.showPasswordOption = false;
      return false;
    }
  }

  // ! Check if the button of Form loginForm it's submit or not
  sumitted = false;

  // ! Validaciones del formulario loginForm
  registerForm = new FormGroup({
    name: new FormControl('',
      [
        Validators.required
      ]
    ),
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]
    ),
    password1: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ),
    password2: new FormControl('',
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

  loggerFormAndFieldsInfo(): void{
    console.log('---------------------------------------------------');
    // ! Email Field Validation Result
    this.registerForm.get('email')?.status === 'VALID' ? console.log('Email OK') : console.error('Email KO');
    // ! Password Field Validation
    this.registerForm.get('password')?.status === 'VALID' ? console.log('Password OK') : console.error('Password KO');
    // ! Form Validation Result
    this.registerForm?.status === 'VALID' ? console.log('Form OK') : console.error('Form KO');
    console.log('---------------------------------------------------');
  }

  // ! Change color of the input with BootStrap class is-valid or is-invalid
  formInputColor(field: string): string{
    if (this.sumitted === true){
      if (this.registerForm?.get(field)?.status === 'VALID'){
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
      if (this.registerForm?.get(field)?.status === 'VALID'){
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
