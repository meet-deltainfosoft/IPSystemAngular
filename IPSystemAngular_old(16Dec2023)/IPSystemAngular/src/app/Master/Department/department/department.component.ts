import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { Department } from '../department';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DepartmentFormComponent } from '../department-form/department-form.component';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  objDepartment: Department = {};
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;


  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;


  constructor(private departmentServices: DepartmentService,
    private router: Router, private dialog: MatDialog, private menuService: SharedMenuService) {
    const currentRoute = this.router.url;
    this.menuService.getMenuData().subscribe((menuData) => {
      this.userRights = menuData;
      this.matchingItem = this.userRights.find((item: { routing: string }) => item.routing === currentRoute);
    });
  }

  ngOnInit() {
    this.GetAllDepartment();
  }

  dialog_title: string = "Department";
  _DepartmentTableDataSource: any;
  _displayColumns = ["Plant", "Department", "actions"];

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._DepartmentTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  async GetAllDepartment() {
    var response = await this.departmentServices.GetAllDepartment(this.objDepartment);
    this._DepartmentTableDataSource = new MatTableDataSource(response.data);
    this._DepartmentTableDataSource.paginator = this.paginator;
    this._DepartmentTableDataSource.sort = this.sort;
  }

  open_department_form(action: string, departmentId: string) {
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
      departmentId: departmentId,
    };
    const dialogRef = this.dialog.open(DepartmentFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      this.GetAllDepartment();
    });
  }

}
