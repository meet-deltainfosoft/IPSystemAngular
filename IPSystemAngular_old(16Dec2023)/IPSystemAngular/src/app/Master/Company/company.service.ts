import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private constant: constant) { }

  async InsertCompany(param:any):Promise<any> {
    const http_url = this.constant.InsertCompany();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAllCompany(param:any):Promise<any> {
    const http_url = this.constant.GetAllCompany();
    try {
      const response = await this.http.post(http_url, param ,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetCompanyById(param:any):Promise<any> {
    const http_url = this.constant.GetCompanyById();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async UpdateCompany(param:any):Promise<any> {
    const http_url = this.constant.UpdateCompany();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
