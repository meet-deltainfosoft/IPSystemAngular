import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavbarComponent } from './_Layout/navbar/navbar.component';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { CompanyComponent } from './Master/Company/company/company.component';
import { CompanyformComponent } from './Master/Company/companyform/companyform.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LineDetailsComponent } from './Master/Company/line-details/line-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select'; 
import { DepartmentComponent } from './Master/Department/department/department.component';
import { PlantComponent } from './Master/Plant/plant/plant.component';
import { PlantFormComponent } from './Master/Plant/plant-form/plant-form.component';
import { DepartmentFormComponent } from './Master/Department/department-form/department-form.component';
import { LevelsComponent } from './Master/Levels/levels/levels.component';
import { LevelsFormComponent } from './Master/Levels/levels-form/levels-form.component';
import { LoginComponent } from './Login/login/login.component';
import { UserRightsComponent } from './Master/UserRights/user-rights/user-rights.component';
import { UserRightFormComponent } from './Master/UserRights/user-right-form/user-right-form.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DashBoardComponent } from './DashBoard/dash-board/dash-board.component';
import { EmployeeFormComponent } from './Master/Employee/employee-form/employee-form.component';
import { EmployeeComponent } from './Master/Employee/employee/employee.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { EmployeeImportComponent } from './Master/Employee/employee-import/employee-import.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './Loader/loader/loader.component';
import { LoaderInterceptorInterceptor } from './Interceptor/loader-interceptor.interceptor';
import { MatMenu } from '@angular/material/menu';
import { KaizenFormsComponent } from './Transactions/kaizen-forms/kaizen-forms.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { KaizenComponent } from './Transactions/kaizen/kaizen/kaizen.component';
import { KaizenImportComponent } from './Transactions/kaizen-import/kaizen-import.component';
import { ApprovalComponent } from './Transactions/Approval/approval/approval.component';
import { ChartModule } from 'primeng/chart';
import { PowerBIEmbedModule } from 'powerbi-client-angular';
import { DashBoard2Component } from './DashBoard/dash-board2/dash-board2.component';
import { NgChartjsModule } from 'ng-chartjs';
import { GiftUploadComponent } from './Transactions/gift-upload/gift-upload.component';
import { RedeemFormComponent } from './Transactions/redeem-form/redeem-form.component';
import { RedeemComponent } from './Transactions/redeem/redeem.component';
import { FiveKaizenComponent } from './Reports/Top5KaizenReports/five-kaizen/five-kaizen.component';
import { CategoryReportComponent } from './Reports/category-report/category-report.component';
import { KaizenStatusReportComponent } from './Reports/kaizen-status-report/kaizen-status-report.component';
import { BestKaizenComponent } from './Reports/best-kaizen/best-kaizen.component';
import{  NgxExtendedPdfViewerModule} from'ngx-extended-pdf-viewer'
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserFormsComponent } from './Master/Users/user-forms/user-forms.component';
import { UserComponent } from './Master/Users/user/user.component';
import { LeaderBoardDetailComponent } from './DashBoard/leader-board-detail/leader-board-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompanyComponent,
    CompanyformComponent,
    LineDetailsComponent,
    DepartmentComponent,
    PlantComponent,
    PlantFormComponent,
    DepartmentFormComponent,
    LevelsComponent,
    LevelsFormComponent,
    LoginComponent,
    UserRightsComponent,
    UserRightFormComponent,
    PageNotFoundComponent,
    DashBoardComponent,
    EmployeeFormComponent,
    EmployeeComponent,
    EmployeeImportComponent,
    LoaderComponent,
    KaizenFormsComponent,
    KaizenComponent,
    KaizenImportComponent,
    ApprovalComponent,
    DashBoard2Component,
    GiftUploadComponent,
    RedeemFormComponent,
    RedeemComponent,
    FiveKaizenComponent,
    CategoryReportComponent,
    KaizenStatusReportComponent,
    BestKaizenComponent,
    UserFormsComponent,
    UserComponent,
    LeaderBoardDetailComponent,
   
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    DatePipe,
    MatProgressSpinnerModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    ChartModule,
    PowerBIEmbedModule,
    NgChartjsModule,
    NgxExtendedPdfViewerModule,
    NgbPaginationModule,
    NgbAlertModule,
    PdfViewerModule
    
  ],
  exports:[
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorInterceptor,
      multi: true,
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } } ,
     { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
