import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {
  constructor(private datePipe: DatePipe) {}

  formatDate(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }
}
