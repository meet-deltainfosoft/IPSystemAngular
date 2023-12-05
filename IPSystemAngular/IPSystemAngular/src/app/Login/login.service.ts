import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/app.constant';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  showNavbar :  BehaviorSubject<boolean>;
  loginStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private constant: constant) { 
    this.showNavbar = new BehaviorSubject<boolean>(true);
  }

  async UserAuthentication(param: any): Promise<any> {
    const http_url = this.constant.UserAuthentication();
    try {
      const response = await this.http.post(http_url, param, httpOptions).toPromise();
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  hide(){
    this.showNavbar.next(false);
  }

  display(){
    this.showNavbar.next(true);
  }
}
