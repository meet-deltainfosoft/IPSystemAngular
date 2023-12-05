import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class FivekaizenService {

  constructor(private http: HttpClient, private constant: constant) { 

  }

  async GetReportsDropDown(): Promise<any> {
    const http_url = this.constant.GetReportsDropDown();
    try {
      const response = await this.http.get(http_url,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async ExportData(reports: any): Promise<Blob> {
    const http_url = this.constant.getReportUrl();
    try {
      const response = await this.http.post(http_url, reports, {
        responseType: 'blob', 
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }).toPromise();
      if (response !== undefined) {
        return Promise.resolve(new Blob([response], { type: 'application/pdf' }));
      } else {
        return Promise.reject('Response is undefined.');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }


}
