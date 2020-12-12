import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // ! Every object have two items:
  // * icon -> Default icon when not make click in the show Password icon
  // * showPasswordOption -> Default icon when not make click in the show Password icon
  // * showPasswordOption -> If the password it's null hidde button show password else display button
  passwords = {
    password1: { item: 1, icon: 'far fa-eye', showPasswordOption: false },
    password2: { item: 2, icon: 'far fa-eye', showPasswordOption: false },
  };

  // ! Check if the button of Form loginForm it's submit or not
  sumitted = false;

  // ! Validaciones del formulario loginForm
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  // TODO : INPUT DESCRIPTION
  visible($event: any, num: number): boolean {
    console.log($event);
    console.log($event.key);
    console.log($event.target);
    const item = document.getElementById($event.target.id) as HTMLInputElement;
    if (this.passwords.password1.item === num) {
      if (item?.value.length > 0) {
        this.passwords.password1.showPasswordOption = true;
        return true;
      } else {
        this.passwords.password1.showPasswordOption = false;
        return false;
      }
    } else if (this.passwords.password2.item === num) {
      if (item?.value.length > 0) {
        this.passwords.password2.showPasswordOption = true;
        return true;
      } else {
        this.passwords.password2.showPasswordOption = false;
        return false;
      }
    }
    return false;
  }

  // ! Change icon on make click in the element
  changeIcon(element: string, num: number): void {
    if (this.passwords.password1.item === num) {
      this.passwords.password1.icon === 'far fa-eye'
        ? (this.passwords.password1.icon = 'far fa-eye-slash')
        : (this.passwords.password1.icon = 'far fa-eye');
      console.log(
        'Current icon to Password1 changed to ' + this.passwords.password1.icon
      );
    } else if (this.passwords.password2.item === num) {
      this.passwords.password2.icon === 'far fa-eye'
        ? (this.passwords.password2.icon = 'far fa-eye-slash')
        : (this.passwords.password2.icon = 'far fa-eye');
      console.log(
        'Current icon to Password2 changed to ' + this.passwords.password2.icon
      );
    }
    this.changePassword(element);
  }

  resetIconNotTxt(e: any, num: number): void {
    const input = document.getElementById(e.target.id) as HTMLTextAreaElement;
    // console.log('Trim', input.value.trim());
    // console.log(input.value.trim().length);
    if (input.value.trim().length === 0 && input?.getAttribute('type') === 'text') {
      console.log('La contraseña se oculta por seguridad');
      console.log(input);
      this.changeIcon(input.id, num);
    }
    // TODO: Si queremos que cuando perdamos el foco del input se oculte la contraseña descomentamos este código
    /*
    if (input?.getAttribute('type') === 'text') {
      console.log('Va a cambiarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      console.log(input);
      this.changeIcon(input.id, num);
    }
    */
  }

  // TODO : INPUT DESCRIPTION
  changePassword(idInput: string): void {
    const maybeMyElement = document.getElementById(idInput);
    if (maybeMyElement?.getAttribute('type') === 'text') {
      maybeMyElement?.setAttribute('type', 'password');
    } else {
      maybeMyElement?.setAttribute('type', 'text');
    }
  }

  // ! Verificación del formulario loginForm
  submitForm(): void {
    this.loggerFormAndFieldsInfo();
    this.sumitted = true;
  }

  // TODO : INPUT DESCRIPTION
  loggerFormAndFieldsInfo(): void {
    console.log('---------------------------------------------------');
    // ! Email Field Validation Result
    this.registerForm.get('name')?.status === 'VALID'
      ? console.log('Name OK')
      : console.error('Name KO');
    // ! Email Field Validation Result
    this.registerForm.get('email')?.status === 'VALID'
      ? console.log('Email OK')
      : console.error('Email KO');
    // ! Password1 Field Validation
    this.registerForm.get('password1')?.status === 'VALID'
      ? console.log('Password1 OK')
      : console.error('Password1 KO');
    // ! Password2 Field Validation
    this.registerForm.get('password2')?.status === 'VALID'
      ? console.log('Password2 OK')
      : console.error('Password2 KO');
    // ! Form Validation Result
    this.registerForm?.status === 'VALID'
      ? console.log('Form OK')
      : console.error('Form KO');
    console.log('---------------------------------------------------');
  }

  // ! Change color of the input with BootStrap class is-valid or is-invalid
  formInputColor(field: string): string {
    if (this.sumitted === true) {
      if (this.registerForm?.get(field)?.status === 'VALID') {
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
      if (this.registerForm?.get(field)?.status === 'VALID') {
        return false;
      }
    } else if (this.sumitted === false) {
      return false;
    }
    return true;
  }

  constructor() {}

  ngOnInit(): void {}
}
