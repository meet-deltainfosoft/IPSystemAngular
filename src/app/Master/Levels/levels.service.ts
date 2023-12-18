import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http: HttpClient, private constant: constant) {
   }

   async InsertLevels(param: any): Promise<any> {
    const http_url = this.constant.InsertLevels();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async UpdateLevels(param: any): Promise<any> {
    const http_url = this.constant.UpdateLevels();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetAllLevels(param: any): Promise<any> {
    const http_url = this.constant.GetAllLevels();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetLevelsById(param: any): Promise<any> {
    const http_url = this.constant.GetLevelsById();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async DeleteLevels(param: any): Promise<any> {
    const http_url = this.constant.DeleteLevels();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
