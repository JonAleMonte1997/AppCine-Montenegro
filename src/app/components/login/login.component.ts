import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }

  logIn() {

    if(this.loginForm.valid){

      let email: string = this.loginForm.controls['email'].value;
      let password: string = this.loginForm.controls['password'].value;

      this.loginService.validateLogin(email, password).subscribe(
        res => {
          if (res) {
            console.log('Usuario logueado con éxito');
          } else {
            console.log('Datos incorrectos');
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

  validateInput(control: string): boolean {
    return (this.loginForm.controls[control].invalid && (this.loginForm.controls[control].dirty || this.loginForm.controls[control].touched))
  }

}
