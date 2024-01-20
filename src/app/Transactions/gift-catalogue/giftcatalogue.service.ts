import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { constant } from 'src/app/app.constant';



const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};


@Injectable({
  providedIn: 'root'
})
export class GiftcatalogueService {

  constructor(private http: HttpClient, private constant: constant) {
  }

  async GetAllGiftVersion(): Promise<any> {
    const http_url = this.constant.GetAllGiftVersion();
    try {
      const response = await this.http.get(http_url, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  DownloadGiftVersionPDF(GiftVersionPath : string):Observable<Blob> {
    const url = `${this.constant.DownloadGiftVersionPDF()}?GiftVersionPath=${GiftVersionPath}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    return this.http.get(url, { responseType: 'blob' });
  }

}
