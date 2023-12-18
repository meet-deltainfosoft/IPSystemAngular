import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class UserRightsService {

  constructor(private http: HttpClient, private constant: constant) {
    
   }

   async GetAllUserRights(param: any): Promise<any> {
    const http_url = this.constant.GetAllUserRights();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async InsertUserRights(param: any): Promise<any> {
    const http_url = this.constant.InsertUserRights();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetUserRightsMenu(): Promise<any> {
    const http_url = this.constant.GetUserRightsMenu();
    try {
      const response = await this.http.post(http_url,  httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetAllRights(): Promise<any> {
    const http_url = this.constant.GetAllRights();
    try {
      const response = await this.http.post(http_url,  httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
