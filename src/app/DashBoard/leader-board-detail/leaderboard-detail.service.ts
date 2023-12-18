import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constant } from 'src/app/app.constant';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: 'root'
})
export class LeaderboardDetailService {

  constructor(private http: HttpClient, private constant: constant) { }

  async GetLeaderBoardDetail(param:any):Promise<any> {
    const http_url = this.constant.GetLeaderBoardDetail();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
