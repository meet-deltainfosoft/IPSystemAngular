import { Component } from '@angular/core';
import { GiftUploadService } from './gift-upload.service';
import { constant } from 'src/app/app.constant';
import { GiftUpload } from './gift-upload';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gift-upload',
  templateUrl: './gift-upload.component.html',
  styleUrls: ['./gift-upload.component.css']
})
export class GiftUploadComponent {
  dialog_title: string = "Upload Gift Catalogue and Point Guideline"
  showButton: boolean = true;
  selectedFile: File | undefined ;
  UserId = this.constant.GetLocalStorage("userId");
  objGiftUpload : GiftUpload = {};


  constructor(private constant: constant, private giftPDFServices: GiftUploadService,private snackBar: MatSnackBar) { }
  handleImport(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  async import() {
    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('userId', this.UserId);
      formData.append('formFile', this.selectedFile);

      var response = await this.giftPDFServices.ImportGiftPDF(formData);
      if (response.data[0].IsSuccessful === 1) {
        this.snackBar.open(response.data[0].Message, "close", {
          duration: 2000,
          panelClass: ['success-snack-bar'],
          verticalPosition: "top",
        });
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
}
