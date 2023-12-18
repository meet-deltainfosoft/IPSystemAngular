import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../Validation/validators.service';
import { NavbarService } from 'src/app/_Layout/navbar/navbar.service';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';
import { NavbarComponent } from 'src/app/_Layout/navbar/navbar.component';
import { MenuItem } from 'src/app/_Layout/MenuItem';

@Component({
  selector: 'app-companyform',
  templateUrl: './companyform.component.html',
  styleUrls: ['./companyform.component.css']
})
export class CompanyformComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  objCompany: Company = {};
  
  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;

  dialog_title: string = "Company";
  _companyTableDataSource: any;

  _displayColumns = ['Company', 'Contact', 'City', 'Pincode', 'GstNumber','CompanyCode' ,'actions']
  constructor(private comanyservices: CompanyService, private router: Router,private menuService: SharedMenuService) {
    const currentRoute = this.router.url;
    this.menuService.getMenuData().subscribe((menuData) => {
      this.userRights = menuData;
      this.matchingItem = this.userRights.find((item: { Routing: string }) => item.Routing === "/Companies");
    });
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      const response = await this.comanyservices.GetAllCompany(this.objCompany); // Await the promise
      this._companyTableDataSource = new MatTableDataSource(response.data);
      this._companyTableDataSource.paginator = this.paginator;
      this._companyTableDataSource.sort = this.sort;
    } catch (error) {
      console.error("Error:", error); // Handle any errors that occur during the request
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._companyTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  open_company_form(action: string, companyId: string) {
    if (companyId !== "") {
      this.router.navigate(['/companyForm'], { queryParams: { companyId: companyId } });
    }
    else {
      this.router.navigate(['/companyForm'], { queryParams: { companyId: "0" } });
    }
  }

  SetUserRights() {

  }


}
