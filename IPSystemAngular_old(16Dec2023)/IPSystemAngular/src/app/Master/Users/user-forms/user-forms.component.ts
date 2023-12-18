import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Users } from '../users';
import { constant } from 'src/app/app.constant';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent implements OnInit {
  formUsers: FormGroup;
  dialog_title: string = "User Master";
  btnText: string = "Save";
  objUsers: Users = {};
  CreatedUserId: string = this.constant.GetLocalStorage("UserId");
  Action: string = "";
  guid = this.constant.generateGUID();
  UserId: string = "";

  constructor(private fb: FormBuilder, private userServices: UsersService,
    private snackBar: MatSnackBar, private constant: constant, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserFormsComponent>) {
    this.formUsers = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      IsDisabled: [undefined, Validators.required]
    })
    this.Action = this.data.action;
    this.UserId = this.data.UserId;
  }
  ngOnInit() {
    if (this.Action === "GetUserById") {
      this.btnText = "Update";
      this.GetUserById();
    }
  }

  async submit() {
    this.objUsers.FirstName = this.formUsers.controls["FirstName"].value;
    this.objUsers.LastName = this.formUsers.controls["LastName"].value;
    this.objUsers.UserName = this.formUsers.controls["UserName"].value;
    this.objUsers.Password = this.formUsers.controls["Password"].value;
    this.objUsers.IsDisabled = this.formUsers.controls["IsDisabled"].value;
    this.objUsers.CUSerId = this.CreatedUserId;
    if (this.Action === "GetUserById") {
      this.objUsers.UserId = this.UserId;
      var response = await this.userServices.UpdateUsers(this.objUsers);
    }
    else {
      this.objUsers.UserId = this.guid;
      var response = await this.userServices.InsertUsers(this.objUsers);
    }

    if (response.isSuccessful === true) {
      this.on_cancel_button();
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
    }
    else {
      this.on_cancel_button();
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
  }

  async GetUserById() {
    this.objUsers.UserId = this.UserId;
    this.objUsers.CUSerId = this.guid;
    var response = await this.userServices.GetUserById(this.objUsers);
    this.formUsers.controls["FirstName"].setValue(response.data[0].FirstName);
    this.formUsers.controls["LastName"].setValue(response.data[0].LastName);
    this.formUsers.controls["UserName"].setValue(response.data[0].UserName);
    this.formUsers.controls["Password"].setValue(response.data[0].Password);
    this.formUsers.controls["IsDisabled"].setValue(response.data[0].IsDisabled);
  }

  on_cancel_button() {
    this.dialogRef.close();
  }
}
