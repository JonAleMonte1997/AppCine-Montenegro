import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  ngOnInit(): void {
  }

  register() {

    let user: User = this.registerForm.value;

    this.userService.add(user).subscribe(
      res => {
        console.log(res);
      }
    );
  }

  validateInput(control: string): boolean {
    return (this.registerForm.controls[control].invalid && (this.registerForm.controls[control].dirty || this.registerForm.controls[control].touched))
  }

}
