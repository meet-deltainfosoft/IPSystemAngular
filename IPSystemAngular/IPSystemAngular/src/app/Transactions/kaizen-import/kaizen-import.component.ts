import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { read, utils, writeFile } from 'xlsx';
import * as moment from 'moment';
import { BaseKaizen } from '../kaizen-forms/kaizen';
import { KaizenService } from '../kaizen.service';
import { constant } from 'src/app/app.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kaizen-import',
  templateUrl: './kaizen-import.component.html',
  styleUrls: ['./kaizen-import.component.css']
})
export class KaizenImportComponent {
  showButton: boolean = false;
  formTitle: string = "Import IP Excel";
  KaizenImport: any[] = [];
  apiFormattedDate: any;
  IsExcelValid: boolean = true;
  UserId = this.constant.GetLocalStorage("userId");

  objKaizenImport: BaseKaizen = {};

  constructor(private router: Router,private constant: constant, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar,private kaizenServices : KaizenService,
    private dialogRef: MatDialogRef<KaizenImportComponent>) { }

  onClose() {
    this.dialogRef.close();
  }

  async import() {
    var response = await this.kaizenServices.ImportKaizen(this.objKaizenImport);
    console.log(response);
    
    if (response.data[0].IsSuccessful === 1) {
      //this.router.navigate(['/kaizen']);
      this.dialogRef.close();
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

  async handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      if (!this.isValidFileType(file)) {
        this.showButton = false;
        this.snackBar.open("Please select a valid file type. Allowed file types are .xlsx, .xls, and .csv", 'close', {
          duration: 2000,
          panelClass: ['error-snack-bar'],
          verticalPosition: 'top',
        });
        return;
      }
      const reader = new FileReader();

      reader.onload = async (event: any) => {
        try {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;
          if (sheets.length) {
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]], {
              raw: false, // Ensure cell values are parsed (not just treated as strings)
              dateNF: 'dd-mm-yyyy HH:mm:ss', // Set the date format you expect
            });

            this.KaizenImport = rows;
            
            

          }
          console.log("Import Is:",this.KaizenImport);
          for (let i = 0; i < this.KaizenImport.length; i++) {
            var dateFormat = this.parseUserInput(this.KaizenImport[i]["DateImplemented"]);
            this.apiFormattedDate = moment(this.KaizenImport[i]["DateImplemented"]).format('YYYY-MM-DD HH:MM');
            if (this.apiFormattedDate == "Invalid date") {
              this.IsExcelValid = false;
            }
            if (this.IsExcelValid === false) {
              this.showButton = false;
              this.snackBar.open("The date format is not valid in the Excel sheet.", "close", {
                duration: 2000,
                panelClass: ['error-snack-bar'],
                verticalPosition: "top",
              });
            }
            else {
              this.showButton = true;
              this.objKaizenImport.AuthorId = this.UserId;
              this.objKaizenImport.ImportKaizen = this.KaizenImport;
            }
          }
        }
        catch (error) {
        }
      }
      reader.readAsArrayBuffer(file);
    }
  }

  isValidFileType(file: File): boolean {
    const allowedExtensions = ['xlsx', 'xls', 'csv'];
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    if (!fileExtension || allowedExtensions.indexOf(fileExtension) === -1) {
      return false;
    }
    return true;
  }

  public parseUserInput(userInput: any) {
    const formatsToTry = ['DD/MM/YYYY', 'DD-MM-YYYY'];
    let parsedDate = null;
    for (const format of formatsToTry) {
      const parsed = moment(userInput, format, true); // Use strict parsing
      if (parsed.isValid()) {
        parsedDate = parsed;
        break; // Exit the loop if parsing succeeds
      }
    }
  }
}
