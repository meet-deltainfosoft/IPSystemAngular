import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyComponent } from '../company/company.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-line-details',
  templateUrl: './line-details.component.html',
  styleUrls: ['./line-details.component.css']
})
export class LineDetailsComponent {


  companyLDForm : FormGroup ;
  btnText : string = "Save";

  on_cancel_button(){
    this.dialogRef.close();
  }

  saveLineDetail(){

  }

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CompanyComponent>){
    this.companyLDForm = this.fb.group
    ({
      ContactNo:['',Validators.required],
      Address: ['']
    })
  }


}
