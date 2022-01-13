import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol, User } from 'src/app/models/user.model';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) { }

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required])
  });

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  ngOnInit(): void {
    let passwordControl = this.registerForm.controls['password'];
    this.registerForm.controls['confirmPassword'].addValidators(checkPasswords(passwordControl));
  }

  register() {

    if(this.registerForm.valid){

      let user: User = this.registerForm.value;

      user.rol = Rol.CLIENT;

      this.userService.add(user).subscribe(
        userRes => {
          this.loginService.validateLogin(userRes.email, userRes.password).subscribe(
            () => window.location.reload()
          )
        }
      );

    } else {

      /************************************************************************************************************************************************
        Si el formulario es inválido al presionar el botón de submit, recorro todos los controladores y cambio la  propiedad touched y dirty a true
        para que aparezcan los mensajes de error si no se realizo focus o click en los inputs anteriormente.
      **************************************************************************************************************************************************/

      Object.keys(this.registerForm.controls).forEach(controlName => {
        this.registerForm.get(controlName)?.markAsTouched({onlySelf: true});
        this.registerForm.get(controlName)?.markAsDirty({onlySelf: true});
      });
    }
  }

  hasError(controlName: string): boolean {
    let control = this.registerForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}

//Validador personalizado para ver si las contraseñas son iguales

function checkPasswords(passwordControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let password = passwordControl.value;
    let confirmPass = control.value;
    return (password === confirmPass) ? null : { notEquals: true }
  };
}
