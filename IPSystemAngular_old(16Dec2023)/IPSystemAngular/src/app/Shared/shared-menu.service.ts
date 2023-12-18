import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../_Layout/navbar/navbar';
import { MenuItem } from '../_Layout/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class SharedMenuService {

  private menuDataSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  public menuData$: Observable<MenuItem[]> = this.menuDataSubject.asObservable();

  constructor() {}

  setMenuData(menuData: MenuItem[]): void {
    this.menuDataSubject.next(menuData);
  }

  getMenuData(): Observable<MenuItem[]> {
    return this.menuData$;
  }
}
