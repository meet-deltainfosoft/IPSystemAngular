import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FivekaizenService } from './fivekaizen.service';
import { Fivekaizen } from '../fivekaizen';
import { constant } from 'src/app/app.constant';
import { Reports } from '../../reports';
import { ReportService } from '../../report.service';
import * as FileSaver from "file-saver";



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
  selector: 'app-five-kaizen',
  templateUrl: './five-kaizen.component.html',
  styleUrls: ['./five-kaizen.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class FiveKaizenComponent implements OnInit{
  pdfsrc : string = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  dialog_title: string = "Top 5 Kaizen Report";
  fromTop5Kaizen: FormGroup;
  PlantList: any[] = [];
  PlantListFilter: any[] = [];
  btnText: string = "Download";
  objFivekaizen: Fivekaizen = {};
  CompanyId: string = this.constant.GetLocalStorage("CompanyId");
  UserId: string = this.constant.GetLocalStorage("userId");
  objReport : Reports = {};

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private FiveKaizenService: FivekaizenService, 
    private constant: constant,private reportService:ReportService) {
    this.fromTop5Kaizen = this.fb.group(
      {
        FromDate: [new Date(), Validators.required],
        ToDate: [new Date(), Validators.required],
        PlantId: ['0', Validators.required]
      })
  }
  ngOnInit() {
    this.GetReportsDropDown();
  }

  async TopPerformer(Action : string) {
    this.objReport.report_content_type = "application/pdf";
    this.objReport.report_export_format = "pdf";
    this.objReport.report_path = "/IPReports/TopIPs";
    this.objReport.report_parameters = {
      FromDate: this.Dateformat(this.fromTop5Kaizen.controls["FromDate"].value),
      ToDate: this.Dateformat(this.fromTop5Kaizen.controls["ToDate"].value),
      PlantId: this.fromTop5Kaizen.controls["PlantId"].value === "0" ? null : this.fromTop5Kaizen.controls["PlantId"].value,
      CompanyId: this.CompanyId,
      UserId: this.UserId,
      Action: "TopPerformer"
    };
    this.reportService.get_report(this.objReport).subscribe((data: any) => {
      const blob = new Blob([data], { type: "application/pdf" });
      if (Action === "Download") {
        FileSaver.saveAs(blob, "TopPerformer");
      }
      else{
        const blobUrl = window.URL.createObjectURL(blob);
          window.open(blobUrl);
      }
    })
  }

  async GetReportsDropDown(){
    var response =await this.FiveKaizenService.GetReportsDropDown();
    this.PlantList = response.data;
  }

  async TopPerformerView(){
    this.objFivekaizen.FromDate =this.Dateformat(this.fromTop5Kaizen.controls["FromDate"].value);
    this.objFivekaizen.ToDate = this.Dateformat(this.fromTop5Kaizen.controls["ToDate"].value);
    this.objFivekaizen.PlantId = this.fromTop5Kaizen.controls["PlantId"].value ==="0"? null : this.fromTop5Kaizen.controls["PlantId"].value;
    this.objFivekaizen.CompanyId = this.CompanyId;
    this.objFivekaizen.UserId = this.UserId;
    const blob = await this.FiveKaizenService.ExportData(this.objFivekaizen);

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

  generatePDF() {
  }
  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

}
