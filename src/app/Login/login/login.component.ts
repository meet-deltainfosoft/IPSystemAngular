import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { constant } from 'src/app/app.constant';
import { Login } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  formLogin: FormGroup;
  ObjLogin: Login = {};

  constructor(private loginServices: LoginService,
    private fb: FormBuilder, private snackBar: MatSnackBar, private constant: constant,
    private router: Router) {
    this.formLogin = this.fb.group({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required])
    })
    this.loginServices.hide();
  }
  ngOnInit() {
    this.loginServices.hide();
  }

  async Login() {
    debugger;
    this.ObjLogin.UserName = this.formLogin.controls["Username"].value;
    this.ObjLogin.Password = this.formLogin.controls["Password"].value;
    var response = await this.loginServices.UserAuthentication(this.ObjLogin);


    if (response.isSuccessful === true) {
      localStorage.setItem("localData", JSON.stringify(response.data[0]));
      this.loginServices.showNavbar.next(response.isSuccessful);
      this.router.navigate(['/dashBoard']);
    }
    else {
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
  }
}
