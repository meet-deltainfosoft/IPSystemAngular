import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';


const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient, private constant: constant) { }

  async InsertPlant(param: any): Promise<any> {
    const http_url = this.constant.InsertPlant();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async UpdatePlant(param: any): Promise<any> {
    const http_url = this.constant.UpdatePlant();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetAllPlant(param: any): Promise<any> {
    const http_url = this.constant.GetAllPlant();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async GetPlantById(param: any): Promise<any> {
    const http_url = this.constant.GetPlantById();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
