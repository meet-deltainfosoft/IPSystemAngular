import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KaizenStatusReport } from './kaizen-status-report';
import { DatePipe } from '@angular/common';
import { constant } from 'src/app/app.constant';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { KaizenStatusReportService } from './kaizen-status-report.service';
import * as FileSaver from "file-saver";
import { Reports } from '../reports';
import { ReportService } from '../report.service';

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
  selector: 'app-kaizen-status-report',
  templateUrl: './kaizen-status-report.component.html',
  styleUrls: ['./kaizen-status-report.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class KaizenStatusReportComponent implements OnInit{
  dialog_title : string = "Point Status Report";
  fromKaizenStatus : FormGroup;
  
  PlantList: any[] = [];
  PlantListFilter: any[] = [];
  btnText: string = "Download";
  CompanyId: string = this.constant.GetLocalStorage("CompanyId");
  UserId: string = this.constant.GetLocalStorage("userId");
  objKaizen: KaizenStatusReport = {};
  objReport : Reports = {};

  constructor(private fb: FormBuilder, private datePipe: DatePipe,  
    private constant: constant,
    private KaizenReportService: KaizenStatusReportService,private reportService:ReportService){
    this.fromKaizenStatus = this.fb.group(
      {
        FromDate: [new Date(), Validators.required],
        ToDate: [new Date(), Validators.required],
        PlantId: ['0', Validators.required],
        ReportType:[0,Validators.required]
      })
  }
  ngOnInit(){
    this.GetReportsDropDown();
  }


  async TopKaizenStatus(Action:string){

    this.objReport.report_content_type = "application/pdf";
    this.objReport.report_export_format = "pdf";
    if(this.fromKaizenStatus.controls["ReportType"].value===0)
    {
      // alert("0")
      this.objReport.report_path = "/IPReports/IPStatus";
    }
    else{
      // alert("1")
      this.objReport.report_path = "/IPReports/IPStatusSummary";
    }
    
    this.objReport.report_parameters = {
      FromDate: this.Dateformat(this.fromKaizenStatus.controls["FromDate"].value),
      ToDate: this.Dateformat(this.fromKaizenStatus.controls["ToDate"].value),
      PlantId: this.fromKaizenStatus.controls["PlantId"].value === "0" ? null : this.fromKaizenStatus.controls["PlantId"].value,
      CompanyId: this.CompanyId,
      UserId: this.UserId,
      Action: "KaizenStatus"
    };
    this.reportService.get_report(this.objReport).subscribe((data: any) => {
      const blob = new Blob([data], { type: "application/pdf" });
      if (Action === "Download") {
        FileSaver.saveAs(blob, "BestKaizen");
      }
      else{
        const blobUrl = window.URL.createObjectURL(blob);
          window.open(blobUrl);
      }
    })
  }
  
  async TopKaizenStatusView(){
    this.objKaizen.FromDate = this.Dateformat(this.fromKaizenStatus.controls["FromDate"].value);
    this.objKaizen.ToDate = this.Dateformat(this.fromKaizenStatus.controls["ToDate"].value);
    this.objKaizen.PlantId = this.fromKaizenStatus.controls["PlantId"].value ==="0"? null : this.fromKaizenStatus.controls["PlantId"].value;
    this.objKaizen.CompanyId = this.CompanyId;
    this.objKaizen.UserId = this.UserId;
    const blob = await this.KaizenReportService.KaizenStatusReportFile(this.objKaizen);

    // Create a Blob URL
    const url = window.URL.createObjectURL(blob);

    // Open the Blob URL in a new tab
    const newTab = window.open(url, '_blank');

    if (newTab) {
      newTab.focus();
    } else {
      // Handle the case where the browser's popup blocker prevents the new tab from opening
      // You can provide a message to the user or fall back to downloading the file
      console.error('A new tab was blocked by the browser. Downloading the file instead.');
      //this.downloadReport(reports);
    }
  }

  async GetReportsDropDown() {
    var response = await this.KaizenReportService.GetReportsDropDown();
    this.PlantList = response.data;
  }

  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

}
