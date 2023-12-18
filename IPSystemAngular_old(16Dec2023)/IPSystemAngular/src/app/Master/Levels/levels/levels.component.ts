import { Component, OnInit, ViewChild } from '@angular/core';
import { LevelsService } from '../levels.service';
import { constant } from 'src/app/app.constant';
import { Levels } from '../levels';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LevelsFormComponent } from '../levels-form/levels-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedMenuService } from 'src/app/Shared/shared-menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  AllowInsert: boolean = true;
  AllowUpdate: boolean = true;
  AllowDelete: boolean = true;
  userRights: any;
  matchingItem: any;


  objLevels: Levels = {};
  constructor(private LevelService: LevelsService,
    private constrant: constant, private dialog: MatDialog, private router: Router, private menuService: SharedMenuService, private snackBar: MatSnackBar, ) {
    const currentRoute = this.router.url;
    this.menuService.getMenuData().subscribe((menuData) => {
      this.userRights = menuData;
      this.matchingItem = this.userRights.find((item: { Routing: string }) => item.Routing === currentRoute);
    });
  }

  ngOnInit() {
    this.GetAllLevels();
  }
  dialog_title: string = "Levels";
  _LevelTableDataSource: any;
  _displayColumns = ['Level', 'Marks', 'Actions']
  UserId: string = this.constrant.GetLocalStorage("userId");
  guid = this.constrant.generateGUID();

  applyFilter(event: any) {

  }

  async GetAllLevels() {
    this.objLevels.levelsId = this.guid;
    this.objLevels.userId = this.UserId;
    var response = await this.LevelService.GetAllLevels(this.objLevels);
    this._LevelTableDataSource = new MatTableDataSource(response.data);
    this._LevelTableDataSource.paginator = this.paginator;
    this._LevelTableDataSource.sort = this.sort;
  }

  open_Leves_form(Action: string, LevelId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.maxHeight = "100%";
    dialogConfig.maxWidth = "100%";
    dialogConfig.width = "1000px";
    dialogConfig.height = "fit-content";
    dialogConfig.data = {
      Action: Action,
      LevelId: LevelId,
    };
    const dialogRef = this.dialog.open(LevelsFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      this.GetAllLevels();
    });
  }

  async confirmDelete(LevelID:string){
    const confirmDelete = window.confirm('Are you sure you want to delete this product order?');
    if (confirmDelete) {
      this.objLevels.levelsId = LevelID;
      var response = await this.LevelService.DeleteLevels(this.objLevels);
      if (response.isSuccessful === true) {
        this.GetAllLevels();
        this.snackBar.open(response.message, "close", {
          duration: 2000,
          panelClass: ['success-snack-bar'],
          verticalPosition: "top",
        });
      }
      else {
        this.snackBar.open(response.message, "close", {
          duration: 2000,
          panelClass: ['error-snack-bar'],
          verticalPosition: "top",
        });
      }

    }
  }

}
