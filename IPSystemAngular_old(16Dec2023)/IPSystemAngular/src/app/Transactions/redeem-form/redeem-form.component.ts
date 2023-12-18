import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ValidatorsService } from 'src/app/Master/Validation/validators.service';
import { RedeemService } from './redeem.service';
import { Redeem } from './redeem';
import { constant } from 'src/app/app.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';

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
  selector: 'app-redeem-form',
  templateUrl: './redeem-form.component.html',
  styleUrls: ['./redeem-form.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class RedeemFormComponent implements OnInit {

  dialog_title: string = "Redeem";
  formRedeem: FormGroup;
  btnText: string = "Submit";
  EmploeeList: any[] = [];
  EmploeeListFilter: any[] = [];
  PointList: any[] = [];
  PointListFilter: any[] = [];
  options: any[] = [];

  objRedeem: Redeem = {};
  Guid = this.constant.generateGUID();
  UserId = this.constant.GetLocalStorage("userId");
  RedeemId: string = "";
  Action: string = "";
  obj: any = {};
  RedeemStatusList : any[] = [];

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private snackBar: MatSnackBar,
    public validationService: ValidatorsService, private redeemServices: RedeemService, private constant: constant, private route: ActivatedRoute, private router: Router) {
    this.formRedeem = this.fb.group
      ({
        EmployeeId: ['', Validators.required],
        Date: [new Date(), Validators.required],
        Points: [0, Validators.required],
        Remarks: ['',Validators.required],
        selectedOption: ['']
      }),
      this.formRedeem.get('Points')?.valueChanges.subscribe((value) => {
        const Points = this.formRedeem?.controls['Points']?.value;
        this.obj.Point = Points;
        this.GetProductsFromPoints(this.obj);

        // obj  = {};
        // this.PointListFilter = this.PointList.filter((x: { Points: any; }) =>
        //   x.Points == Points);
      })


  }

  async GetProductsFromPoints(Points: any) {
    var response = await this.redeemServices.GetProductsFromPoints(this.obj);
    this.options = response.data;
  }

  ngOnInit() {
    this.GetRedeemDropDown();
    this.route.queryParams.subscribe((params) => {
      this.RedeemId = params['RedeemId'];
      this.Action = params['Action'];
    });

    if (this.Action === "GetRedeemById") {
      this.btnText = "Submit";
      this.GetRedeemById();
    }

  }

  async GetRedeemById() {
    var response = await this.redeemServices.GetRedeemById(this.RedeemId);
    this.formRedeem.controls["EmployeeId"].setValue(response.data[0].EmployeeId);
    this.formRedeem.controls["Date"].setValue(response.data[0].Date);
    this.formRedeem.controls["Points"].setValue(response.data[0].Points);
    this.formRedeem.controls["Remarks"].setValue(response.data[0].Remarks);
    this.formRedeem.controls["selectedOption"].setValue(response.data[0].PointId);
  }

  async submit() {
    if (this.formRedeem.controls["selectedOption"].value === "") {
      this.snackBar.open("Please Select At Least One Redeem", "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
    else {
      this.objRedeem.RedeemId = this.Action === "InsertRedeem" ? this.Guid : this.RedeemId;
      this.objRedeem.EmployeeId = this.formRedeem.controls["EmployeeId"].value;
      this.objRedeem.Date = this.Dateformat(this.formRedeem.controls["Date"].value);
      this.objRedeem.Points = this.formRedeem.controls["selectedOption"].value;
      this.objRedeem.UserId = this.UserId;
      this.objRedeem.Remarks = this.formRedeem.controls["Remarks"].value;

      var response = this.Action === "InsertRedeem" ? await this.redeemServices.InsertRedeem(this.objRedeem) : await this.redeemServices.UpdateRedeem(this.objRedeem);
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





  }
  on_cancel_button() {
    this.router.navigate(['/redeem']);
  }

  async GetRedeemDropDown() {
    var response = await this.redeemServices.GetRedeemDropDown();
    console.log(response);
    
    this.EmploeeList = response.data.employee;
    this.EmploeeListFilter = this.EmploeeList;
    this.PointList = response.data.point;
    this.PointListFilter = this.PointList;
    this.RedeemStatusList = response.data.redeemStatus;
  }

  FilterEmployee(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.EmploeeListFilter = inputValue ? this.EmploeeList.filter((opt: { Employee: string }) =>
      opt.Employee.toLowerCase().includes(inputValue)) : this.EmploeeList;
  }


  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }
  FilterPoints(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.PointListFilter = inputValue ? this.PointList.filter((opt: { Point: string }) =>
      opt.Point.toLowerCase().includes(inputValue)) : this.PointList;
  }

  PointSystemChanged(eid: number) {

  }
}
