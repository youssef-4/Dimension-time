import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // ! Default icon when not make click in the show Password icon
  icon1 = 'far fa-eye';
  icon2 = 'far fa-eye';

  // ! Check if the button of Form loginForm it's submit or not
  sumitted = false;

  // ! If the password it's null hidde button show password else display button
  showPasswordOption = false;

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

  // ! Change icon on make click in the element
  changeIconI(element: string): void {
    this.icon1 === 'far fa-eye'
    ?
      this.icon1 = 'far fa-eye-slash'
    :
      this.icon1 = 'far fa-eye';

    console.log('Pasword icon changed to ' + this.icon1);
    console.log(document.getElementById('iamapassword'));
    this.changePassword(element);
  }

    // ! Change icon on make click in the element
    changeIconII(element: string): void {
      this.icon2 === 'far fa-eye'
      ?
        this.icon2 = 'far fa-eye-slash'
      :
        this.icon2 = 'far fa-eye';

      console.log('Pasword icon changed to ' + this.icon2);
      console.log(document.getElementById('iamapassword'));
      this.changePassword(element);
    }

  // TODO : INPUT DESCRIPTION
  changePassword(idInput: string): void{
    const maybeMyElement = document.getElementById(idInput);
    if (maybeMyElement?.getAttribute('type') === 'text'){
      maybeMyElement?.setAttribute('type', 'password');
    } else{
      maybeMyElement?.setAttribute('type', 'text');
    }
  }

  // TODO : INPUT DESCRIPTION
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

  // ! Verificación del formulario loginForm
  submitForm(): void{
    this.loggerFormAndFieldsInfo();
    this.sumitted = true;
  }

  // TODO : INPUT DESCRIPTION
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
