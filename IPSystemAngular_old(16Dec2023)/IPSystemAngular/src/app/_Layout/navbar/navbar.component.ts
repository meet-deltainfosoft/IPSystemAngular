import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Menu, Navbar } from './navbar';
import { MatToolbar } from '@angular/material/toolbar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { LoginService } from 'src/app/Login/login.service';
import { Route, Router } from '@angular/router';
import { constant } from 'src/app/app.constant';
import { NavbarService } from './navbar.service';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';
import { MenuItem } from '../MenuItem';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  showNavBar: boolean = false;
  subscription: Subscription;
  loginStatus = new BehaviorSubject<boolean>(false);
  submenuOpen: boolean = false;
  userName: string = "Mohamed Imran Shahul Hameed ABCC";
  Company: string = "Delta kaizen";
  menu: Menu = {}



  public masterMenu: MenuItem[] =
    [{
      ChildId: '',
      ChildDescription: 'Company',
      Routing: '/dashboard',
      Icon: 'dashboard',
      AllowDelete: true,
      AllowInsert: true,
      AllowUpdate: true,
      Parent: 'Master'
    }];

  public TransactionsMenu: MenuItem[] =
    [{
      ChildId: '',
      ChildDescription: 'Company',
      Routing: '/dashboard',
      Icon: 'dashboard',
      AllowDelete: true,
      AllowInsert: true,
      AllowUpdate: true,
      Parent: 'Transaction'
    }];


    public ReportsMenu: MenuItem[] =
    [{
      ChildId: '',
      ChildDescription: 'Company',
      Routing: '/dashboard',
      Icon: 'dashboard',
      AllowDelete: true,
      AllowInsert: true,
      AllowUpdate: true,
      Parent: 'Transaction'
    }];


  constructor(private loginServices: LoginService, private router: Router,
    private constant: constant, private NavBarServices: NavbarService, private menuService: SharedMenuService) {
    this.subscription = this.loginServices.showNavbar.subscribe((value) => {
      this.showNavBar = value;
    })
  }

  ngOnInit() {
    this.subscription = this.loginServices.showNavbar.subscribe((value) => {
      this.showNavBar = value;
    })

    if (localStorage.length === 0) {
      this.router.navigate(['/login']);
    }
    else {
      this.sidenev?.close();
      this.Company = "POINT SYSTEM FOR IMPROVEMENT PROPOSALS";
      this.userName = this.constant.GetLocalStorage("Name");
    }
    this.GetAllMenu();
  }
  async GetAllMenu() {
    this.menu.UserId = this.constant.GetLocalStorage("userId");
    var response = await this.NavBarServices.GetAllMenu(this.menu);
    console.log(response.data);
    
    this.masterMenu = response.data.masters;
    this.TransactionsMenu = response.data.transaction;
    this.ReportsMenu = response.data.reports;

     this.menuService.setMenuData(response.data.masters);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  @ViewChild('sidenev') sidenev?: MatSidenav;
  @ViewChild('header', { read: ElementRef }) header?: ElementRef;

  logoutclick() {
    this.loginServices.hide();
    localStorage.removeItem("localData");
    this.router.navigate(['/login']);
  }
}
  