import { Injectable } from '@angular/core';
import { Reports } from './reports';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constant } from 'src/app/app.constant';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    responseType: "blob" as "json",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private constant: constant) { }

  get_report(objReport: Reports): any {
    const http_url = this.constant.getReportUrl();
    return this.http.post<any>(http_url, objReport, {
      responseType: "blob" as "json",
    });
  }
}
