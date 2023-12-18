import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class KaizenService {

  constructor(private http: HttpClient, private constant: constant) { }

  // async GetAllKaizenDropDown(param: any): Promise<any> {
  //   const http_url = this.constant.GetAllKaizenDropDown();
  //   try {
  //     const response = await this.http.get(http_url, { params: param }).toPromise();
  //     return Promise.resolve(response);
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  async GetAllKaizenDropDown(AuthorId:string): Promise<any> {
    const http_url = this.constant.GetAllKaizenDropDown();
    try {
      const response = await this.http.get(`${http_url}?AuthorId=${AuthorId}`, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async InsertKaizen(param:any): Promise<any> {
    const http_url = this.constant.InsertKaizen();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async UpdateKaizen(param:any): Promise<any> {
    const http_url = this.constant.UpdateKaizen();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetAllKaizen(): Promise<any> {
    const http_url = this.constant.GetAllKaizen();
    try {
      const response = await this.http.get(http_url,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async ExportKaizenTemplate(): Promise<any> {
    const http_url = this.constant.ExportKaizenTemplate();
    try {
      const response = await this.http.get(http_url,httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetKaizenById(AuthorId:string): Promise<any> {
    const http_url = this.constant.GetKaizenById();
    try {
      const response = await this.http.get(`${http_url}?KaizenId=${AuthorId}`, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async ImportKaizen(param:any): Promise<any> {
    const http_url = this.constant.ImportKaizen();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
