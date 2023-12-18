import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor(private http: HttpClient, private constant: constant) { }

  async GetApprovalDropDown(param : any): Promise<any> {
    const http_url = this.constant.GetApprovalDropDown();
    try {
      const response = await this.http.post(http_url,param,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAllApprove(param : any): Promise<any> {
    const http_url = this.constant.GetAllApprove();
    try {
      const response = await this.http.post(http_url,param,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
