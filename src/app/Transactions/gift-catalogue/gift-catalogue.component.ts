import { Component, OnInit, ViewChild } from '@angular/core';
import { Giftcatalogue } from './giftcatalogue';
import { constant } from 'src/app/app.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GiftUploadService } from '../gift-upload/gift-upload.service';
import { GiftcatalogueService } from './giftcatalogue.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gift-catalogue',
  templateUrl: './gift-catalogue.component.html',
  styleUrls: ['./gift-catalogue.component.css']
})
export class GiftCatalogueComponent implements OnInit {

  objgiftcatalogue: Giftcatalogue = {};
  dialog_title: string = "Upload Gift Catalogue and Point Guideline"
  showButton: boolean = true;
  selectedFile: File | undefined;
  FormgiftCatalogue: FormGroup;
  CompanyId: string = this.constant.GetLocalStorage("CompanyId");
  UserId: string = this.constant.GetLocalStorage("userId");
  Guid = this.constant.generateGUID();

  _GiftCatalogueTableDataSource: any;
  _displayColumns = ["Version", "GiftCataloguePath"];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.GetAllGiftVersion();
  }

  constructor(private fb: FormBuilder, private constant: constant, private snackBar: MatSnackBar,
    private GiftCatlogueService: GiftcatalogueService, private GiftUploadServices: GiftUploadService) {
    this.FormgiftCatalogue = this.fb.group({
      Version: ['', Validators.required]
    })
  }

  async GetAllGiftVersion() {
    var response = await this.GiftCatlogueService.GetAllGiftVersion();
    console.log("Data Is: ", response.data.giftVersions);
    this.FormgiftCatalogue.controls["Version"].patchValue(response.data.countResults[0].CountVersion);
    this._GiftCatalogueTableDataSource = new MatTableDataSource(response.data.giftVersions); //response.data.giftVersions;
    this._GiftCatalogueTableDataSource.paginator = this.paginator;
    this._GiftCatalogueTableDataSource.sort = this.sort;
  }

  handleImport(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async import() {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('UserId', this.UserId);
      formData.append('GiftCataloguePath', this.selectedFile);
      formData.append('Version', this.FormgiftCatalogue.controls["Version"].value);
      formData.append('GiftVersionId', this.Guid);

      var response = await this.GiftUploadServices.InsertGiftVersion(formData);
      if (response.data[0].IsSuccessful === 1) {
        this.snackBar.open(response.data[0].Message, "close", {
          duration: 2000,
          panelClass: ['success-snack-bar'],
          verticalPosition: "top",
        });
        this.GetAllGiftVersion();
      }
      else {
        this.snackBar.open(response.data[0].Message, "close", {
          duration: 2000,
          panelClass: ['error-snack-bar'],
          verticalPosition: "top",
        });
      }

    }
  }

  async PDFDownload(GiftVersionPath: string) {
    this.GiftCatlogueService.DownloadGiftVersionPDF(GiftVersionPath).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'gift.pdf';
        link.click();
      },
      (error) => {
        console.error('An error occurred:', error);
        // Handle the error, e.g., show an error message to the user
      }
    );
  }

}
