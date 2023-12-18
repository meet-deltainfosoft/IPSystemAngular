import { Component, OnInit, ViewChild } from '@angular/core';
import { KaizenService } from '../../kaizen.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeImportComponent } from 'src/app/Master/Employee/employee-import/employee-import.component';
import { KaizenImportComponent } from '../../kaizen-import/kaizen-import.component';

@Component({
  selector: 'app-kaizen',
  templateUrl: './kaizen.component.html',
  styleUrls: ['./kaizen.component.css']
})
export class KaizenComponent implements OnInit{
  dialog_title : string = "Improvement Proposal"
  _KaizenTableDataSource : any;
  _displayColumns = ["Number", "Date", "Plant","CostSaving","Category","Status","actions"];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private kaizenServices: KaizenService,private router: Router, private dialog: MatDialog  ){}

  ngOnInit(){
    this.GetAllKaizen();
  }

  applyFilter(event : any){
    const filterValue = (event.target as HTMLInputElement).value;
    this._KaizenTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  open_kaizen_form(Action : string,kaizenId: string,Type : string){
    this.router.navigate(['/kaizenForm'], { queryParams: { Action: Action, kaizenId: kaizenId,Type : Type } });
  }

  async GetAllKaizen(){
    var response = await this.kaizenServices.GetAllKaizen();
    this._KaizenTableDataSource = new MatTableDataSource(response.data);
    this._KaizenTableDataSource.paginator = this.paginator;
    this._KaizenTableDataSource.sort = this.sort;
  }

  ImportExcel(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.width = "1000px";
    dialogConfig.height = "fit-content";
    const dialogRef = this.dialog.open(KaizenImportComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      this.GetAllKaizen ();
    });
  }

  async ExportEmployeesTemplate(){
    var response = await this.kaizenServices.ExportKaizenTemplate();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(response.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Kaizen Import');
    XLSX.writeFile(wb, "Kaizen Import.xlsx");
  }
}
