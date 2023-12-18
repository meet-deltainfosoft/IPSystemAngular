import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { constant } from 'src/app/app.constant';
import { EmployeeService } from '../employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { read, utils, writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { EmployeeBase, EmployeeImportDetail } from '../employees';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-import',
  templateUrl: './employee-import.component.html',
  styleUrls: ['./employee-import.component.css']
})
export class EmployeeImportComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private constant: constant, private EmployeeServices: EmployeeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeImportComponent>) {
    this.UserId = this.constant.GetLocalStorage("userId");
  }

  ngOnInit() {
    //throw new Error('Method not implemented.');
  }
  _ImportDataSource: any;
  arrayBuffer: any;
  formTitle: string = "Employee Import";
  showButton: boolean = false;
  EmployeeImport: any[] = [];
  apiFormattedDate: any;
  formattedDate1: any;
  IsExcelValid: boolean = true;
  ObjEmployeeBase: EmployeeBase = {};
  objEmployeeImportDetail: EmployeeImportDetail = {}
  
  UserId: string = "";
  _displayColumns = ["Remark", "SrNo", "SAPId", "ShortalInitial", "Employee", "JobTitle", "Department"];
  async import() {
    var response = await this.EmployeeServices.ImportEmployee(this.ObjEmployeeBase);
    if (response.isSuccessful === true) {
      this.dialogRef.close();
      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['success-snack-bar'],
        verticalPosition: "top",
      });
    }
    else {
      this._ImportDataSource = new MatTableDataSource(response.data);
      this._ImportDataSource.paginator = this.paginator;
      this._ImportDataSource.sort = this.sort;

      this.snackBar.open(response.message, "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
  }
  onClose() {
    this.dialogRef.close();
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
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);
            this.EmployeeImport = rows;
          }
          for (let i = 0; i < this.EmployeeImport.length; i++) {
            var dateFormat = this.parseUserInput(this.EmployeeImport[i]["DateOfJoin"]);
            this.apiFormattedDate = moment(this.EmployeeImport[i]["DateOfJoin"]).format('YYYY-MM-DD');
            if (dateFormat) {
              const formattedDate1 = dateFormat.format('DD-MMM-YYYY');
              this.apiFormattedDate = moment(formattedDate1).format('YYYY-MM-DD');
            }
            if (this.apiFormattedDate == "Invalid date") {
              this.IsExcelValid = false;
            }
            this.EmployeeImport[i]["DateOfJoin"] = this.apiFormattedDate;
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
            this.ObjEmployeeBase.UserId = this.UserId;
            this.ObjEmployeeBase.employeeImportDetails = this.EmployeeImport;
          }
        }
        catch (error) {
        }
      }
      reader.readAsArrayBuffer(file);
    }

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

    return parsedDate;
  }

  uploadFile($event: any) {

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

  ExportEmployeesTemplate(){}

}
