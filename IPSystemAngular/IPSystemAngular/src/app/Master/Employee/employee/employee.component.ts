import { Component, OnInit, ViewChild } from '@angular/core';
import { Employees } from '../employees';
import { constant } from 'src/app/app.constant';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';
import { EmployeeService } from '../employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { IfStmt } from '@angular/compiler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeImportComponent } from '../employee-import/employee-import.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dialog_title: string = "Employees";
  _EmployeesTableDataSource: any;
  objEmployees: Employees = {};
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  guid = this.constant.generateGUID();
  _displayColumns = ["Employee", "SAPId", "ShortalInitial", "JobTitle", "actions"];

  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;

  applyFilter(event: any) { }

  open_Employee_form(Action: string, EmployeeId: string) {
    this.router.navigate(['/EmployeeForm'], { queryParams: { Action: Action, EmployeeId: EmployeeId } });
  }

  async GetAllEmployees() {
    this.objEmployees.EmployeId = this.guid;
    this.objEmployees.Department = this.guid;
    this.objEmployees.JobTitle = this.guid;
    this.objEmployees.UserId = this.guid;
    this.objEmployees.SAPId = "";
    this.objEmployees.DateOfJoin = "";
    this.objEmployees.ShortalInitial = "";
    this.objEmployees.Employee = "";

    var response = await this.employeeServices.GetAllEmployees(this.objEmployees);
    this._EmployeesTableDataSource = new MatTableDataSource(response.data);
    this._EmployeesTableDataSource.paginator = this.paginator;
    this._EmployeesTableDataSource.sort = this.sort;

  }

  constructor(private constant: constant, private router: Router,
    private menuService: SharedMenuService, private employeeServices: EmployeeService, private dialog: MatDialog) {
    const currentRoute = this.router.url;
    this.menuService.getMenuData().subscribe((menuData) => {
      this.userRights = menuData;
      this.matchingItem = this.userRights.find((item: { Routing: string }) => item.Routing === currentRoute);
    });
  }

  ngOnInit() {
    this.GetAllEmployees();
  }

  async GetEmployeesById() {

  }

  ImportExcel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.width = "1000px";
    dialogConfig.height = "fit-content";
    // let rateObj: any = {};
    const dialogRef = this.dialog.open(EmployeeImportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      this.GetAllEmployees();
    });

  }
  async ExportEmployeesTemplate() {
    var response = await this.employeeServices.ExportEmployeesTemplate();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(response.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employee Import');
    XLSX.writeFile(wb, "Employee Import.xlsx");
  }

}
