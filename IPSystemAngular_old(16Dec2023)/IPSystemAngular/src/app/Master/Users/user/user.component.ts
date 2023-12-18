import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserFormsComponent } from '../user-forms/user-forms.component';
import { constant } from 'src/app/app.constant';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dialog_title: string = "User Master";
  _UsersTableDataSource: any;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  _displayColumns = ["FirstName", "LastName", "UserName", "IsAdmin", "actions"];

  ngOnInit() {
    this.GetAllUser();
  }

  constructor(private userServices: UsersService, private dialog: MatDialog,
    ) { }

  async GetAllUser() {
    var response = await this.userServices.GetAllUser();
    this._UsersTableDataSource = new MatTableDataSource(response.data);
    this._UsersTableDataSource.paginator = this.paginator;
    this._UsersTableDataSource.sort = this.sort;
  }


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._UsersTableDataSource.filter = filterValue.trim().toLowerCase();
  }
  open_Users_form(action: string, UserId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.width = "1000px";
    dialogConfig.height = "fit-content";
    dialogConfig.data = {
      action: action,
      UserId: UserId,
    };
    const dialogRef = this.dialog.open(UserFormsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      this.GetAllUser();
    });
  }


}
