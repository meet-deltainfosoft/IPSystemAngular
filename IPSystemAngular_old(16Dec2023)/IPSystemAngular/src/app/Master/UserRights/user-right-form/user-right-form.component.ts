import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/_Layout/navbar/navbar.service';
import { constant } from 'src/app/app.constant';
import { UserRightsService } from '../user-rights.service';
import { UserRights } from '../user-rights';
import { MatTableDataSource } from '@angular/material/table';
import { async } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-right-form',
  templateUrl: './user-right-form.component.html',
  styleUrls: ['./user-right-form.component.css']
})
export class UserRightFormComponent implements OnInit {
  UserDetails: string = "";
  dialog_title: string = "User Rights For: " + this.UserDetails
  formUserRights: FormGroup;
  ParentMenuList: any;
  btnText: string = "Fetch";
  guid = this.constant.generateGUID();
  UserId: string = this.constant.GetLocalStorage("userId");
  EndUserId: string = "";
  objUserRights: UserRights = {};
  _displayColumns = ['SRNo', 'ChildDescription', 'AllowAll', 'AllowInsert', 'AllowUpdate', 'AllowDelete']
  //_UserRightsTableDataSource: any[] =[];
  _UserRightsTableDataSource: any;
  selectedMenuId: string = '';
  selectAllCheckbox: boolean = false;


  @ViewChild('selectAllCheckboxRef', { static: false }) selectAllCheckboxRef!: MatCheckbox;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private constant: constant, private route: ActivatedRoute,
    private UserRightsServices: UserRightsService
  ) {
    this.formUserRights = this.fb.group({
      //MenuId: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.EndUserId = params['UserId'];
      this.UserDetails = params["FullName"]
      this.dialog_title = "User Rights For: " + this.UserDetails
    });
    this.GetAllMenu();
  }
  async GetAllMenu() {
    var response = await this.UserRightsServices.GetUserRightsMenu();
    this.ParentMenuList = response.data;
  }



  async GetAllUserRights() {
    this.objUserRights.ParentMenuId = this.selectedMenuId;
    this.objUserRights.EndUserId = this.EndUserId;
    this.objUserRights.UserId = this.UserId;
    var response = await this.UserRightsServices.GetAllUserRights(this.objUserRights);
    this._UserRightsTableDataSource = new MatTableDataSource(response.data);
    this.selectAllCheckbox = false;
  }

  checkAllPermissions(element: any) {
    if (element.AllowAll) {
      element.AllowInsert = true;
      element.AllowUpdate = true;
      element.AllowDelete = true;
    } else {
      element.AllowInsert = false;
      element.AllowUpdate = false;
      element.AllowDelete = false;
    }
  }

  toggleSelectAll() {
    const selectAllValue = this.selectAllCheckboxRef.checked;
    for (const element of this._UserRightsTableDataSource.data) {
      element.AllowAll = selectAllValue;
      element.AllowInsert = selectAllValue;
      element.AllowUpdate = selectAllValue;
      element.AllowDelete = selectAllValue;
    }
  }

  async submit() {
    const selectedDetails = [];
    for (const element of this._UserRightsTableDataSource.data) {
      const detail = {
        menuId: element.ChildId,
        AllowInsert: element.AllowInsert,
        AllowUpdate: element.AllowUpdate,
        AllowDelete: element.AllowDelete,
      };
      selectedDetails.push(detail);
    }

    this.objUserRights.ParentMenuId = this.guid;
    this.objUserRights.EndUserId = this.EndUserId;
    this.objUserRights.UserId = this.UserId;
    this.objUserRights.UT_UserRights = selectedDetails;
    var response = await this.UserRightsServices.InsertUserRights(this.objUserRights);
    if (response.isSuccessful === true) {
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
    }

  }
}
