import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LineDetailsComponent } from '../line-details/line-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from '../../Validation/validators.service';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';
import { constant } from 'src/app/app.constant';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  panelOpenState = false;
  objCompany: Company = {};
  dialog_title: string = "Company";
  companyForm: FormGroup;
  btnText: string = "Save";
  companyId: string = "";
  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;
  userId: string = this.constant.GetLocalStorage("userId");

  _displayColumns = ['SrNo', 'Contact', 'Address', 'Action']
  //_companyTableDataSource: any;

  _companyTableDataSource: any[] = [
    { SrNo: 1, Contact: 'John Doe', Address: '123 Main St' },
    { SrNo: 2, Contact: 'Jane Smith', Address: '456 Elm St' },
    // Add more data as needed
  ];

  constructor(private comanyservices: CompanyService,
    private fb: FormBuilder, private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router, private snackBar: MatSnackBar,
    public validationService: ValidatorsService, private menuService: SharedMenuService,private constant: constant,) {
    this.companyForm = this.fb.group
      ({
        company: ['', Validators.required],
        Address: [''],
        Contact: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],],
        City: ['', Validators.required],
        Pincode: ['', [Validators.minLength(6),
        Validators.maxLength(6)]],
        CompanyCode:['',Validators.required],
        GstNumber: ['',[Validators.required,Validators.minLength(15),Validators.maxLength(15)]],
      })
    const currentRoute = this.router.url;
    this.menuService.getMenuData().subscribe((menuData) => {
      this.userRights = menuData;
      this.matchingItem = this.userRights.find((item: { Routing: string }) => item.Routing === currentRoute);
      console.log(this,this.matchingItem);
      
      if(this.matchingItem.AllowInsert === false && this.matchingItem.AllowUpdate === false && this.matchingItem.AllowDelete === false){
        this.router.navigate(["/dashBoard"]);
      }
    });
    // if (this.AllowInsert === false) {
    //   this.router.navigate(["/dashBoard"]);
    // }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.companyId = params["companyId"]
    })
    this.GetCompanyById();

  }




  async GetCompanyById() {
    if (this.companyId === "0") {
      this.btnText = 'Save';
    }
    else {
      this.btnText = 'Update';
      this.objCompany.CompanyId = this.companyId;
      var response = await this.comanyservices.GetCompanyById(this.objCompany);
      this.companyForm.controls["company"].setValue(response.data.company[0].Company);
      this.companyForm.controls["Address"].setValue(response.data.company[0].Address);
      this.companyForm.controls["Contact"].setValue(response.data.company[0].Contact);
      this.companyForm.controls["City"].setValue(response.data.company[0].City);
      this.companyForm.controls["Pincode"].setValue(response.data.company[0].Pincode);
      this.companyForm.controls["GstNumber"].setValue(response.data.company[0].GstNumber);
      this.companyForm.controls["CompanyCode"].setValue(response.data.company[0].CompanyCode);
    }
  }

  AddNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.width = "1000px";
    dialogConfig.height = "fit-content";
    const dialogRef = this.dialog.open(LineDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      //this.getSociety ();
    });
  }

  async setValue() {
    if (this.companyId !== "0") {
      this.objCompany.CompanyId = this.companyId;
    }
    else {
      this.objCompany.CompanyId = "1E07FB65-FA2C-4FCB-8CBE-E4A56B85182F";
    }
    this.objCompany.Company = this.companyForm.controls["company"].value;
    this.objCompany.Address = this.companyForm.controls["Address"].value;
    this.objCompany.Contact = this.companyForm.controls["Contact"].value;
    this.objCompany.Pincode = this.companyForm.controls["Pincode"].value;
    this.objCompany.City = this.companyForm.controls["City"].value;
    this.objCompany.GstNumber = this.companyForm.controls["GstNumber"].value;
    this.objCompany.CompanyCode = this.companyForm.controls["CompanyCode"].value;
    this.objCompany.UserId = this.userId;
    this.objCompany.lineDetails = [{
      lineDetailId: "", address: "", contact: "", companyId: "", isDelete: true, isDirty: true, isNew: true
    }]




    var response: any;
    if (this.companyId !== "0") {
      response = await this.comanyservices.UpdateCompany(this.objCompany);
    }
    else {
      response = await this.comanyservices.InsertCompany(this.objCompany);
    }

    console.log("Response Is: ", response);
    if (response.isSuccessful === true) {

      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
      this.router.navigate(['/Companies']);
    } else {
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
  }

  saveCompany() {
    this.setValue();
  }


  on_cancel_button() {
    this.router.navigate(['/Companies']);
  }
}
