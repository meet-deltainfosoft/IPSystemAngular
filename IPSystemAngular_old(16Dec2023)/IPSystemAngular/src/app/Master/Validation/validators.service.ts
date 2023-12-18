import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  validateNo(e: any): boolean {
    if (e > 31 && (e < 48 || e > 57)) {
      return false;
    }
    else {
      return true;
    }
  }

  globalValidateNo(event: any): void {
    if (!this.validateNo(event.keyCode)) {
      event.preventDefault();
    }
  }
}
