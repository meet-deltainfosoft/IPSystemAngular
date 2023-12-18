import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient, private constant: constant) { }

  async InsertEmployees(param: any): Promise<any> {
    const http_url = this.constant.InsertEmployees();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async UpdateEmployees(param: any): Promise<any> {
    const http_url = this.constant.UpdateEmployees();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetAllEmployees(param: any): Promise<any> {
    const http_url = this.constant.GetAllEmployees();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetEmployeesById(param: any): Promise<any> {
    const http_url = this.constant.GetEmployeesById();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetAllEmployeesDropDown(param: any): Promise<any> {
    const http_url = this.constant.GetAllEmployeesDropDown();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async ImportEmployee(param: any): Promise<any> {
    const http_url = this.constant.ImportEmployee();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async ExportEmployeesTemplate(): Promise<any> {
    const http_url = this.constant.ExportEmployeesTemplate();
    try {
      const response = await this.http.post(http_url,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
