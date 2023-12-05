import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CategoryReportService } from './category-report.service';
import { constant } from 'src/app/app.constant';
import { CategoryReport } from './category-report';
import { Reports } from '../reports';
import { ReportService } from '../report.service';
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
  selector: 'app-category-report',
  templateUrl: './category-report.component.html',
  styleUrls: ['./category-report.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class CategoryReportComponent implements OnInit {

  dialog_title: string = "IP Categories";
  fromCategory: FormGroup;
  PlantList: any[] = [];
  PlantListFilter: any[] = [];
  btnText: string = "Download";
  objCategory: CategoryReport = {};
  CompanyId: string = this.constant.GetLocalStorage("CompanyId");
  UserId: string = this.constant.GetLocalStorage("userId");
  objReport: Reports = {};




  constructor(private fb: FormBuilder, private datePipe: DatePipe,
    private CategoryReportService: CategoryReportService, private constant: constant, private reportService: ReportService) {
    this.fromCategory = this.fb.group(
      {
        FromDate: [new Date(), Validators.required],
        ToDate: [new Date(), Validators.required],
        PlantId: ['0', Validators.required]
      })
  }
  ngOnInit() {
    this.GetReportsDropDown();
  }
  async TopCategory(Action:string) {
    this.objReport.report_content_type = "application/pdf";
    this.objReport.report_export_format = "pdf";
    this.objReport.report_path = "/IPReports/TopCategory";
    this.objReport.report_parameters = {
      FromDate: this.Dateformat(this.fromCategory.controls["FromDate"].value),
      ToDate: this.Dateformat(this.fromCategory.controls["ToDate"].value),
      PlantId: this.fromCategory.controls["PlantId"].value === "0" ? null : this.fromCategory.controls["PlantId"].value,
      CompanyId: this.CompanyId,
      UserId: this.UserId,
      Action: "TopCategories"
    };
    this.reportService.get_report(this.objReport).subscribe((data: any) => {
      const blob = new Blob([data], { type: "application/pdf" });
      if (Action === "Download") {
        FileSaver.saveAs(blob, "TopCategory");
      }
      else{
        const blobUrl = window.URL.createObjectURL(blob);
          window.open(blobUrl);
      }
    })
  }
  

  async GetReportsDropDown() {
    var response = await this.CategoryReportService.GetReportsDropDown();
    this.PlantList = response.data;
  }

  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

}
