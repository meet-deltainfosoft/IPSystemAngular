import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderUtilityService } from '../loader-utility.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit,AfterViewInit{
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  changeDetector: any;
  constructor(private _httpClient: HttpClient,private loaderService: LoaderUtilityService,private cdr: ChangeDetectorRef) { 
    this.isLoading = new BehaviorSubject(false);
  }
  ngAfterViewInit(): void {
    this.isLoading = this.loaderService.isLoading;
    this.cdr.detectChanges();
    //throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
