import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { constant } from 'src/app/app.constant';
import { LevelsService } from '../levels.service';
import { Levels } from '../levels';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidatorsService } from '../../Validation/validators.service';


@Component({
  selector: 'app-levels-form',
  templateUrl: './levels-form.component.html',
  styleUrls: ['./levels-form.component.css']
})
export class LevelsFormComponent implements OnInit {
  formLevels: FormGroup;
  dialog_title: string = "Levels";
  btnText: string = "Save";
  objLevels: Levels = {};
  UserId: string = this.constant.GetLocalStorage("userId");
  guid = this.constant.generateGUID();
  LevelsId: string = "";
  Action: string = "";

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private constant: constant,
    private LevelServices: LevelsService, @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<LevelsFormComponent>,public validationService: ValidatorsService
  ) {
    this.formLevels = this.fb.group({
      Levels: ['', Validators.required],
      Marks: [undefined, Validators.required]
    })
    this.LevelsId = this.data.LevelId;
    this.Action = this.data.Action;
  }

  ngOnInit() {
    this.LevelsId = this.data.LevelId;
    this.btnText = this.Action === "InsertLevels" ? "Save" : "Update";
    this.GetLevelsById();
  }

  async submit() {
    this.objLevels.levelsId = this.LevelsId !== "0" ? this.LevelsId : this.guid;
    this.objLevels.level = this.formLevels.controls["Levels"].value;
    this.objLevels.marks = this.formLevels.controls["Marks"].value;
    this.objLevels.userId = this.UserId;
    var response = await this.LevelServices.UpdateLevels(this.objLevels);
    var response = this.Action === "InsertLevels" ? await this.LevelServices.InsertLevels(this.objLevels) : await this.LevelServices.UpdateLevels(this.objLevels);
    console.log("Successful Is :, ",response.data[0]);
    
    if (response.data[0].IsSuccessful === 1) {
      this.dialogRef.close();
      this.snackBar.open(response.data[0].Message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
    } else {
      this.snackBar.open(response.data[0].Message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
  }

  on_cancel_button() {
    this.dialogRef.close();
  }

  numberValidator(control: FormControl) {
    if (isNaN(control.value)) {
      return { notANumber: true };
    }
    return null;
  }

  async GetLevelsById() {
    if (this.data.Action !== "InsertLevels") {
      this.objLevels.levelsId = this.LevelsId;
      this.objLevels.userId = this.UserId;
      var response = await this.LevelServices.GetLevelsById(this.objLevels);
      this.formLevels.controls["Levels"].setValue(response.data[0].Level);
      this.formLevels.controls["Marks"].setValue(response.data[0].Marks);
    }
  }

}
