import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class RedeemService {

  constructor(private http: HttpClient, private constant: constant) { }

  async InsertRedeem(param: any): Promise<any> {
    const http_url = this.constant.InsertRedeem();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async UpdateRedeem(param: any): Promise<any> {
    const http_url = this.constant.UpdateRedeem();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetRedeemById(RedeemId: string): Promise<any> {
    const http_url = this.constant.GetRedeemById();
    try {
      const response = await this.http.get(`${http_url}?RedeemId=${RedeemId}`, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetRedeemDropDown(): Promise<any> {
    const http_url = this.constant.GetRedeemDropDown();
    try {
      const response = await this.http.get(http_url,  httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async GetRedeem(): Promise<any> {
    const http_url = this.constant.GetRedeem();
    try {
      const response = await this.http.get(http_url,  httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async GetProductsFromPoints(param: any): Promise<any> {
    const http_url = this.constant.GetProductsFromPoints();
    try {
      const response = await this.http.post(http_url,param,  httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  
}
