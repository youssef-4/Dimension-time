import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  // ! Check if the button of Form loginForm it's submit or not
  sumitted = false;

  // ! Every object have two items:
  // * icon -> Default icon when not make click in the show Password icon
  // * showPasswordOption -> Default icon when not make click in the show Password icon
  // * showPasswordOption -> If the password it's null hidde button show password else display button
  passwords = {
    password1: { item: 1, icon: 'far fa-eye', showPasswordOption: false },
    password2: { item: 2, icon: 'far fa-eye', showPasswordOption: false },
  };

  // Defino el formulario como FormGroup fuera del constructor con el fin de trabajar con el dentro del constructor
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    // ! Validaciones del formulario loginForm
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]],
      password1: ['', [
        Validators.required,
        Validators.minLength(6),
      ]],
      password2: ['', [
        Validators.required,
        Validators.minLength(6),
        this.matchOtherValidator('password1') // this function call the method matchOtherValidator
      ]],
    });
  }

  // ! This function Validate if the input parameter its equals than input value
  matchOtherValidator(otherControlName: string): any {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl): {matchOther: boolean} | null {
      if (!control.parent) {
        return null;
      }

      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error(
            'matchOtherValidator(): other control is not found in parent group'
          );
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true,
        };
      }

      return null;
    };
  }

  // ! ngOnInitComponent
  ngOnInit(): void {}

  // ! Show or hidde button if the input field if this have text
  visible($event: any, num: number): boolean {
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
    } else if (this.passwords.password2.item === num) {
      this.passwords.password2.icon === 'far fa-eye'
        ? (this.passwords.password2.icon = 'far fa-eye-slash')
        : (this.passwords.password2.icon = 'far fa-eye');
    }
    this.changePassword(element);
  }

  // ! - Volverá a asingar el
  // TODO: Si queremos que cuando perdamos el foco del input se oculte la contraseña utilizaremos y añadiremos el correspondiente evento
  // * if (input?.getAttribute('type') === 'text') { this.changeIcon(input.id, num); }
  // * Y finalmente añadimos (focusout)="resetIconNotTxt($event, 2) al input
  resetIconNotTxt(e: any, num: number): void {
    const input = document.getElementById(e.target.id) as HTMLTextAreaElement;
    if (
      input.value.trim().length === 0 &&
      input?.getAttribute('type') === 'text'
    ) {
      this.changeIcon(input.id, num);
    }
  }

  // ! - Change input type to the password type to text type
  changePassword(idInput: string): void {
    const maybeMyElement = document.getElementById(idInput);
    if (maybeMyElement?.getAttribute('type') === 'text') {
      maybeMyElement?.setAttribute('type', 'password');
    } else {
      maybeMyElement?.setAttribute('type', 'text');
    }
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

  // ! Verificación del formulario loginForm
  submitForm(): void {
    this.sumitted = true;
    if (this.registerForm.valid === true){
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm?.get('password1')?.value;
      this.authService.onRegister(email, password);
    } else{
      console.log('El formulario no se ha enviado');
    }
  }
}
