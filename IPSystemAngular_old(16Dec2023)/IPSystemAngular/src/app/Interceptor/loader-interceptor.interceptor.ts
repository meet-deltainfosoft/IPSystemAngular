// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable, finalize } from 'rxjs';
// import { LoaderUtilityService } from '../Loader/loader-utility.service';


// @Injectable()
// export class LoaderInterceptorInterceptor implements HttpInterceptor {
//   constructor(private loaderService: LoaderUtilityService) { }
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     this.loaderService.show();
//     return next.handle(request).pipe(
//       finalize(() => this.loaderService.hide()),
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, finalize, delay } from 'rxjs/operators';
import { LoaderUtilityService } from '../Loader/loader-utility.service';

@Injectable()
export class LoaderInterceptorInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderUtilityService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    
    return next.handle(request).pipe(
      switchMap(response => {
        // Simulate a minimum loading time of 1 second
        return of(response).pipe(delay(300));
      }),
      finalize(() => this.loaderService.hide())
    );
  }
}
