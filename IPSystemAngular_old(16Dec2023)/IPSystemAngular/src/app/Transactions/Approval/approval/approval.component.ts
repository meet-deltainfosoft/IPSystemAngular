import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ApprovalService } from '../approval.service';
import { constant } from 'src/app/app.constant';
import { Approval } from '../approval';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

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
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class ApprovalComponent implements OnInit {
  dialog_title: string = "Financial Validation";
  formApproval : FormGroup;

  fromDate = new Date();
  toDate = new Date();
  PlantId: string = "";
  plantList : any[]= [];
  KaizenList: any[]=[];
  KaizenFilter : any[] = [];
  KaizenId : string= "";
  guid = this.constant.generateGUID();
  objApproval: Approval = {};
  UserId = this.constant.GetLocalStorage("userId");
  btnText = "Search";
  isFormValid: boolean = false;
  _ApprovalTableDataSource : any;
  IsData : boolean = false;
  statusList : any[]= [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  _displayColumns = ['Number','Date', 'Category','Proposal','Result','Plant','CostSaving','actions'];

  constructor(private datePipe: DatePipe, private ApprovalServices: ApprovalService,
    private constant: constant,private fb: FormBuilder,private router: Router, ) {
      this.formApproval = this.fb.group({
        FromDate :[new Date(new Date().getFullYear(), 0, 1),Validators.required],
        ToDate :[new Date(),Validators.required],
        PlantId :["0",Validators.required],
        kaizenId :["0",[Validators.required]],
        StatusId:["0",Validators.required]
      }),
      this.formApproval.get('PlantId')?.valueChanges.subscribe((value) => {
        //this.KaizenFilter = this.KaizenList;
        const selectedPlant = this.formApproval?.controls['PlantId']?.value;
        if(selectedPlant === "0"){
          this.KaizenFilter = this.KaizenList;
        }
        else{
          this.KaizenFilter = this.KaizenList.filter((x: { PlantId: any; }) =>
          x.PlantId == selectedPlant);
        }
      }
      
      )
  }
  ngOnInit() {  
    this.GetApprovalDropDown();
  }

  

  async GetApprovalDropDown() {
    this.objApproval.FromDate = this.Dateformat(this.fromDate);
    this.objApproval.ToDate = this.Dateformat(this.toDate);
    this.objApproval.KaizenIds = this.guid;
    this.objApproval.PlantIds = this.guid;
    this.objApproval.UserIds = this.UserId;
    var response = await this.ApprovalServices.GetApprovalDropDown(this.objApproval);
    this.statusList =response.data.status;
    
    this.KaizenList = response.data.kaiznes;
    
    this.plantList = response.data.plants;

  }

  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

  async GetAllApprove(){
    this.objApproval.FromDate = this.Dateformat(this.formApproval.controls["FromDate"].value);
    this.objApproval.ToDate = this.Dateformat(this.formApproval.controls["ToDate"].value);
    this.objApproval.KaizenIds = this.formApproval.controls["kaizenId"].value === "0" ? null : this.formApproval.controls["kaizenId"].value;
    this.objApproval.PlantIds = this.formApproval.controls["PlantId"].value ==="0"? null : this.formApproval.controls["PlantId"].value;
    this.objApproval.StatusId = this.formApproval.controls["StatusId"].value ==="0"? null : this.formApproval.controls["StatusId"].value; 
    
    var response = await this.ApprovalServices.GetAllApprove(this.objApproval);

    console.log(response.data);
    
  
    if(response.data.length > 0){
      this.IsData = true;
    }
    this._ApprovalTableDataSource = new MatTableDataSource(response.data);
    this._ApprovalTableDataSource.paginator = this.paginator;
    this._ApprovalTableDataSource.sort = this.sort;
  }

  applyFilter(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
    this._ApprovalTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  OpenIPForm(Action : string,kaizenId : string,Type : string){
    this.router.navigate(['/kaizenForm'], { queryParams: { Action: Action, kaizenId: kaizenId , Type: Type} });
  }

  FilterIP(event : any){
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.KaizenFilter = inputValue ? this.KaizenFilter.filter((opt: { Number: string }) =>
      opt.Number.toLowerCase().includes(inputValue)) : this.KaizenList;
  }
}
