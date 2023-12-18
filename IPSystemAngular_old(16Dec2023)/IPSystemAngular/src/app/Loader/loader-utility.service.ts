import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderUtilityService {

  
  isLoading = new Subject<boolean>();
  constructor(private _httpClient: HttpClient) { 
    //this.isLoading = new BehaviorSubject(false);
  }


  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
