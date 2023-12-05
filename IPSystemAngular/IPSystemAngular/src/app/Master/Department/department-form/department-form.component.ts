import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { constant } from 'src/app/app.constant';
import { DepartmentService } from '../department.service';
import { Department } from '../department';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentFormComponent implements OnInit {
  guid = this.constant.generateGUID();
  formDepartments: FormGroup;
  dialog_title: string = "Department";
  btnText: string = "Save";
  PlantList: any;
  PlantListFilter: any;
  objDepartment: Department = {};
  departmentId: string = "";
  Action: string = "";
  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;


  constructor(private constant: constant, private DepartmentService: DepartmentService,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DepartmentFormComponent>) {

    this.formDepartments = this.fb.group
      ({
        Department: ['', Validators.required],
        PlantId: ['', Validators.required]
      })
    this.departmentId = this.data.departmentId;
    this.Action = this.data.action;
  }

  ngOnInit() {
    this.Action = this.data.action;
    this.GetDepartmentDropDown();
    this.GetDepartmentById();
    this.btnText = this.Action === "InsertDepartment" ? "Save" : "Update";
  }

  async GetDepartmentDropDown() {
    this.objDepartment.DepartmentId = this.guid;
    this.objDepartment.UserId = this.guid;
    var response = await this.DepartmentService.GetDepartmentDropDown(this.objDepartment);
    this.PlantList = response.data;
    this.PlantListFilter = this.PlantList;
  }

  on_cancel_button() {
    this.dialogRef.close();
  }

  async submit() {
    this.objDepartment.DepartmentId = this.data.departmentId === "0" ? this.guid : this.data.departmentId;
    this.objDepartment.DepartmentName = this.formDepartments.controls["Department"].value;
    this.objDepartment.PlantId = this.formDepartments.controls["PlantId"].value;
    this.objDepartment.UserId = this.guid;
    var response = this.Action === "InsertDepartment" ? await this.DepartmentService.InsertDepartment(this.objDepartment) : await this.DepartmentService.UpdateDepartment(this.objDepartment);
    var response = await this.DepartmentService.UpdateDepartment(this.objDepartment);
    if (response.isSuccessful === true) {
      this.dialogRef.close();
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
    }
    else {
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
  }

  async GetDepartmentById() {
    this.objDepartment.DepartmentId = this.data.departmentId === "0" ? this.guid : this.data.departmentId;
    this.objDepartment.PlantId = this.guid;
    this.objDepartment.UserId = this.guid;
    var response = await this.DepartmentService.GetDepartmentById(this.objDepartment);
    if (this.Action !== "InsertDepartment") {
      this.formDepartments.controls["Department"].setValue(response.data[0].Department);
      this.formDepartments.controls["PlantId"].setValue(response.data[0].PlantId);
    }
  }

  filterPlant(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.PlantListFilter = inputValue ? this.PlantList.filter((opt: { Plant: string }) =>
      opt.Plant.toLowerCase().includes(inputValue)) : this.PlantList;
  }


}


