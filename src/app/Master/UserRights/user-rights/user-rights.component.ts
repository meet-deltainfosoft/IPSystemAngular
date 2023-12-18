import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserRightsService } from '../user-rights.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-rights',
  templateUrl: './user-rights.component.html',
  styleUrls: ['./user-rights.component.css']
})
export class UserRightsComponent implements OnInit{
  
  
  dialog_title : string = "User Rights";
  _UserRightsTableDataSource:any;
  _displayColumns=['Name','IsAdmin','actions'];
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private router: Router,private UseRightsService : UserRightsService) {
   
  }

  ngOnInit(){
    this.GetAllRights();
  }

  applyFilter(event : any){
    const filterValue = (event.target as HTMLInputElement).value;
    this._UserRightsTableDataSource.filter = filterValue.trim().toLowerCase();
  }

  OpenUserFrom(Action:string,UserId : string , FullName : string){
    this.router.navigate(['/userRightsForm'], { queryParams: { UserId: UserId, FullName: FullName } });
  }

  async GetAllRights(){
    var response =await this.UseRightsService.GetAllRights();
    this._UserRightsTableDataSource = new MatTableDataSource(response.data);
    this._UserRightsTableDataSource.paginator = this.paginator;
    this._UserRightsTableDataSource.sort = this.sort;
  }

}
