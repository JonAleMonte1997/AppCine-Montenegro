import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  hide: boolean = true;

  ngOnInit(): void {

  }

  logIn() {

    if(this.loginForm.valid){

      let email: string = this.loginForm.controls['email'].value;
      let password: string = this.loginForm.controls['password'].value;

      this.loginService.validateLogin(email, password).subscribe(
        res => {
          if (res) {
            window.location.reload();
          } else {
            this.snackBar.open('Email o contraseña incorrectos', undefined, {
              horizontalPosition: 'end',
              duration: 3000
            })
          }
        }
      )

    } else {

      /************************************************************************************************************************************************
        Si el formulario es inválido al presionar el botón de submit, recorro todos los controladores y cambio la  propiedad touched y dirty a true
        para que aparezcan los mensajes de error si no se realizo focus o click en los inputs anteriormente.
      **************************************************************************************************************************************************/

      Object.keys(this.loginForm.controls).forEach(controlName => {
        this.loginForm.get(controlName)?.markAsTouched({onlySelf: true});
        this.loginForm.get(controlName)?.markAsDirty({onlySelf: true});
      });
    }
  }

  hasError(controlName: string): boolean {
    let control = this.loginForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

}
