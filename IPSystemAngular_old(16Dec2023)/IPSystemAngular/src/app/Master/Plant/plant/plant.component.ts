import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlantFormComponent } from '../plant-form/plant-form.component';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  _PlantTableDataSource: any;
  _displayColumns = ['Plant', 'actions'];
  objPlant: Plant = {};

  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;
 

  ngOnInit() {
    this.GetAllPlant();
  }

  constructor(private plantServices: PlantService, private dialog: MatDialog,
    private menuService: SharedMenuService, private router: Router) {
    const currentRoute = this.router.url;
    this.menuService.getMenuData().subscribe((menuData) => {  
      this.userRights = menuData;
      this.matchingItem = this.userRights.find((item: { Routing: string }) => item.Routing === currentRoute);
    });
  }
  dialog_title: string = "Plant";
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this._PlantTableDataSource.filter = filterValue.trim().toLowerCase();
  }
  OpenPlantForm(Action: string, PlantId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.width = "1000px";
    dialogConfig.height = "fit-content";
    dialogConfig.data = {
      action: Action,
      PlantId: PlantId,
    };
    const dialogRef = this.dialog.open(PlantFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      this.GetAllPlant();
    });
  }

  async GetAllPlant() {
    var response = await this.plantServices.GetAllPlant(this.objPlant);
    this._PlantTableDataSource = new MatTableDataSource(response.data);
    this._PlantTableDataSource.paginator = this.paginator;
    this._PlantTableDataSource.sort = this.sort;
  }
}
