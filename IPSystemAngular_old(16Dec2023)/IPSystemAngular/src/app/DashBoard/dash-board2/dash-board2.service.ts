import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constant } from 'src/app/app.constant';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DashBoard2Service {

  constructor(private http: HttpClient, private constant: constant) { }

  async GetDashBoardData(param:any):Promise<any> {
    const http_url = this.constant.GetDashBoardData();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetDashBoardDropdDown():Promise<any> {
    const http_url = this.constant.GetDashBoardDropdDown();
    try {
      const response = await this.http.get(http_url,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

   DownloadGiftPDF():Observable<Blob> {
    const http_url = this.constant.DownloadGiftPDF();
    return this.http.get(http_url, { responseType: 'blob' });
  }
}
