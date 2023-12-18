import { Component, OnInit, ViewChild } from '@angular/core';
import { constant } from 'src/app/app.constant';
import { RedeemService } from '../redeem-form/redeem.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.css']
})
export class RedeemComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  _RedeemTableDataSource: any;
  guid = this.constant.generateGUID();
  _displayColumns = ["Employee", "Date", "Points", "Remarks", "actions"];

  constructor(private constant: constant, private redeemServices: RedeemService, private router: Router,) { }

  ngOnInit() {
    this.GetRedeem();
  }
  dialog_title: string = "Redeem";

  open_Redeem_form(Action: string, Id: any) {
    this.router.navigate(['/redeemForms'], { queryParams: { Action: Action, RedeemId: Id } });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._RedeemTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  async GetRedeem() {
    var response = await this.redeemServices.GetRedeem();
    this._RedeemTableDataSource = new MatTableDataSource(response.data);
    this._RedeemTableDataSource.paginator = this.paginator;
    this._RedeemTableDataSource.sort = this.sort;
  }
  async ExportRedeemed() {
    var response = await this.redeemServices.GetRedeem();
    const data = response.data;
    //const data = response.data;

    // Remove the "RedeemId" property from each object
    const dataWithoutRedeemId = data.map(({ RedeemId, ...rest }: { RedeemId: any, [key: string]: any }) => rest);

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(dataWithoutRedeemId);

    // Apply styling for the header row
    ws['A1'].s = { font: { color: { rgb: 'FFFFFF' }, bold: true }, fill: { bgColor: { indexed: 27 }, fgColor: { rgb: '001935' } }, alignment: { horizontal: 'center' } };

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Trigger download
    XLSX.writeFile(wb, 'output.xlsx');


  }
}
