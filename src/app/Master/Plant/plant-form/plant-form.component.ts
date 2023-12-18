import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Plant } from '../plant';
import { PlantService } from '../plant.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { constant } from 'src/app/app.constant';
import { Router } from '@angular/router';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';

@Component({
  selector: 'app-plant-form',
  templateUrl: './plant-form.component.html',
  styleUrls: ['./plant-form.component.css']
})
export class PlantFormComponent implements OnInit {
  guid = this.constant.generateGUID();
  formPlants: FormGroup;
  dialog_title: string = "Plant";
  btnText: string = "Save";
  userId: string = this.constant.GetLocalStorage("userId");
  plantId: string = "0";
  objPlant: Plant = {};
  action: string = "";


  constructor(private plantServices: PlantService, private fb: FormBuilder, private router: Router, private menuService: SharedMenuService,
    private dialog: MatDialog, private snackBar: MatSnackBar, private constant: constant,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<PlantFormComponent>) {
    this.plantId = this.data.PlantId;
    this.action = this.data.action;
    this.formPlants = this.fb.group({
      Plant: new FormControl('', [Validators.required]),
    })
    
  }
  ngOnInit() {
    this.btnText = this.action === "InsertPlant" ? "Save" : "Update";
    this.action = this.action;
    this.GetPlantById();
  }

  async submit() {
    this.objPlant.UserId = this.userId;
    this.objPlant.PlantName = this.formPlants.controls["Plant"].value;
    this.plantId = this.plantId;
    this.objPlant.PlantId = this.plantId;
    var response = this.action === "InsertPlant" ? await this.plantServices.InsertPlant(this.objPlant) : await this.plantServices.UpdatePlant(this.objPlant);
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

  on_cancel_button() {
    this.dialogRef.close();
  }

  async GetPlantById() {
    this.objPlant.PlantId = this.data.plantId === "0" ? this.guid : this.data.plantId;
    this.objPlant.PlantId = this.data.PlantId;
    this.objPlant.UserId = this.userId;
    if (this.action !== "InsertPlant") {
      var response = await this.plantServices.GetPlantById(this.objPlant);
      this.formPlants.controls["Plant"].setValue(response.data[0].Plant);
    }
  }



}
