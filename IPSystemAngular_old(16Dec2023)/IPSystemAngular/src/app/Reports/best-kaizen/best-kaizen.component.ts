import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { constant } from 'src/app/app.constant';
import { BestKaizenService } from './best-kaizen.service';
import { BestKaizen } from './best-kaizen';
import html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable } from 'jspdf-autotable';
import 'jspdf-autotable';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { ReportService } from '../report.service';
import { Reports } from '../reports';
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
  selector: 'app-best-kaizen',
  templateUrl: './best-kaizen.component.html',
  styleUrls: ['./best-kaizen.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]

})


export class BestKaizenComponent implements OnInit {

  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];
  @ViewChild('htmlData') htmlData!: ElementRef;
  @ViewChild('content') popupview !: ElementRef;

  invoiceno: string = "101";

  fromBestKaizen: FormGroup;
  dialog_title: string = "Point and Saving Overview";
  PlantList: any[] = [];
  PlantListFilter: any[] = [];
  btnText: string = "Download";
  objFivekaizen: BestKaizen = {};
  CompanyId: string = this.constant.GetLocalStorage("CompanyId");
  pdfurl = '';
  objReport: Reports = {}

  UserId: string = this.constant.GetLocalStorage("userId");

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private BestKaizenService: BestKaizenService,
    private constant: constant, private modalservice: NgbModal, private reportService: ReportService) {
    this.fromBestKaizen = this.fb.group(
      {
        FromDate: [new Date(), Validators.required],
        ToDate: [new Date(), Validators.required],
        PlantId: ['0', Validators.required]
      })
  }

  ngOnInit() {
    this.GetReportsDropDown();
  }

  async BestIPS(Action:string) {
    this.objReport.report_content_type = "application/pdf";
    this.objReport.report_export_format = "pdf";
    this.objReport.report_path = "/IPReports/BestKaizen";
    this.objReport.report_parameters = {
      FromDate: this.Dateformat(this.fromBestKaizen.controls["FromDate"].value),
      ToDate: this.Dateformat(this.fromBestKaizen.controls["ToDate"].value),
      PlantId: this.fromBestKaizen.controls["PlantId"].value === "0" ? null : this.fromBestKaizen.controls["PlantId"].value,
      CompanyId: this.CompanyId,
      UserId: this.UserId,
      Action: "BestKaizen"
    };
    this.reportService.get_report(this.objReport).subscribe((data: any) => {
      const blob = new Blob([data], { type: "application/pdf" });
      if (Action === "Download") {
        FileSaver.saveAs(blob, "Point and Saving Overview");
      }
      else{
        const blobUrl = window.URL.createObjectURL(blob);
          window.open(blobUrl);
      }
    })
  }


  async GetReportsDropDown() {
    var response = await this.BestKaizenService.GetReportsDropDown();
    this.PlantList = response.data;
  }




  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }



}
