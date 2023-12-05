import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Disposition': 'multipart/form-data' }),
};


@Injectable({
  providedIn: 'root'
})
export class GiftUploadService {

  constructor(private http: HttpClient, private constant: constant) { 
  }

  async ImportGiftPDF(param: any): Promise<any> {
    const http_url = this.constant.ImportGiftPDF();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
