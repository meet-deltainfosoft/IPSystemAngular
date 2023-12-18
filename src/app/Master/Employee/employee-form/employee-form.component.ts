import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { constant } from 'src/app/app.constant';
import { Employees } from '../employees';
import { EmployeeService } from '../employee.service';
import { DateUtilsService } from 'src/app/Utilities/date-utilsservice';
import { ValidatorsService } from '../../Validation/validators.service';
import { ActivatedRoute, Router } from '@angular/router';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class EmployeeFormComponent implements OnInit {
  dialog_title: string = "Employee";
  formEmployees: FormGroup;
  JobTitleFilter: any;
  JobTitle: any;
  Department: any;
  DepartmentFilter: any;
  btnText: string = "Save";
  ObjEmployees: Employees = {}
  UserId = this.constant.GetLocalStorage("UserId");
  EmployeId: string = "";
  Action: string = "";


  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;
  guid = this.constant.generateGUID();

  constructor(private constant: constant,
    private fb: FormBuilder, private route: ActivatedRoute, private snackBar: MatSnackBar, private datePipe: DatePipe,
    private EmployeeServices: EmployeeService, public validationService: ValidatorsService, private router: Router,) {
    this.formEmployees = this.fb.group
      ({
        SAPId: ['', Validators.required],
        ShortalInitial: [''],
        Employee: ['', Validators.required],
        JobTitle: ['', Validators.required],
        // Department: ['', Validators.required],
        picker: [new Date()]
      })
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.EmployeId = params['EmployeeId'];
      this.Action = params['Action'];
    });
    this.GetAllEmployeesDropDown();
    this.GetEmployeesById();
  }

  filterJobTitle(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.JobTitleFilter = inputValue ? this.JobTitle.filter((opt: { Text: string }) =>
      opt.Text.toLowerCase().includes(inputValue)) : this.JobTitle;
  }

  filterDepartment(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.DepartmentFilter = inputValue ? this.Department.filter((opt: { Department: string }) =>
      opt.Department.toLowerCase().includes(inputValue)) : this.Department;
  }

  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

  async submit() {
    //this.ObjEmployees.Department = this.formEmployees.controls["Department"].value;
    this.ObjEmployees.JobTitle = this.formEmployees.controls["JobTitle"].value;
    this.ObjEmployees.Employee = this.formEmployees.controls["Employee"].value;
    this.ObjEmployees.ShortalInitial = this.formEmployees.controls["ShortalInitial"].value;
    this.ObjEmployees.DateOfJoin = this.Dateformat(this.formEmployees.controls["picker"].value);
    this.ObjEmployees.SAPId = this.formEmployees.controls["SAPId"].value;
    this.ObjEmployees.UserId = this.UserId;
      
    var response = this.Action === "InsertEmployees" ?  await this.EmployeeServices.InsertEmployees(this.ObjEmployees) : await this.EmployeeServices.UpdateEmployees(this.ObjEmployees);

    if (response.data[0].IsSuccessful === 1) {
      this.on_cancel_button();
      this.snackBar.open(response.data[0].Message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
    }
    else {
      this.snackBar.open(response.data[0].Message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }

  }

  on_cancel_button() {
    this.router.navigate(['/Employee']);
  }

  async GetAllEmployeesDropDown() {
    this.ObjEmployees.EmployeId = this.guid;
    this.ObjEmployees.JobTitle = this.ObjEmployees.EmployeId;
    this.ObjEmployees.Department = this.ObjEmployees.EmployeId;
    var response = await this.EmployeeServices.GetAllEmployeesDropDown(this.ObjEmployees);
    this.DepartmentFilter = response.data.department;
    this.Department = this.DepartmentFilter;
    this.JobTitle = response.data.jobTitle;
    this.JobTitleFilter = this.JobTitle;
  }

  async GetEmployeesById() {
    if (this.Action !== "InsertEmployees") {
      this.ObjEmployees.EmployeId = this.EmployeId;
      this.ObjEmployees.JobTitle = this.ObjEmployees.EmployeId;
      this.ObjEmployees.Department = this.ObjEmployees.EmployeId;
      var response = await this.EmployeeServices.GetEmployeesById(this.ObjEmployees);
      this.formEmployees.controls["SAPId"].setValue(response.data[0].SAPId);
      this.formEmployees.controls["ShortalInitial"].setValue(response.data[0].ShortalInitial);
      this.formEmployees.controls["Employee"].setValue(response.data[0].Employee);
     // this.formEmployees.controls["Department"].setValue(response.data[0].Department);
      this.formEmployees.controls["JobTitle"].setValue(response.data[0].JobTitle);
      this.formEmployees.controls["picker"].setValue(response.data[0].DateOfJoin);
      this.btnText = "Update";
    }
    else{
      this.btnText = "Save";
    }
  }

}
