import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './_Layout/navbar/navbar.component';
import { CompanyformComponent } from './Master/Company/companyform/companyform.component';
import { CompanyComponent } from './Master/Company/company/company.component';
import { DepartmentComponent } from './Master/Department/department/department.component';
import { PlantComponent } from './Master/Plant/plant/plant.component';
import { PlantFormComponent } from './Master/Plant/plant-form/plant-form.component';
import { DepartmentFormComponent } from './Master/Department/department-form/department-form.component';
import { LoginComponent } from './Login/login/login.component';
import { UserRightFormComponent } from './Master/UserRights/user-right-form/user-right-form.component';
import { UserRightsComponent } from './Master/UserRights/user-rights/user-rights.component';
import { LevelsComponent } from './Master/Levels/levels/levels.component';
import { LevelsFormComponent } from './Master/Levels/levels-form/levels-form.component';
import { PageNotFoundComponent } from './PageNotFound/page-not-found/page-not-found.component';
import { DashBoardComponent } from './DashBoard/dash-board/dash-board.component';
import { EmployeeFormComponent } from './Master/Employee/employee-form/employee-form.component';
import { EmployeeComponent } from './Master/Employee/employee/employee.component';
import { KaizenFormsComponent } from './Transactions/kaizen-forms/kaizen-forms.component';
import { KaizenComponent } from './Transactions/kaizen/kaizen/kaizen.component';
import { ApprovalComponent } from './Transactions/Approval/approval/approval.component';
import { DashBoard2Component } from './DashBoard/dash-board2/dash-board2.component';
import { GiftUploadComponent } from './Transactions/gift-upload/gift-upload.component';
import { RedeemFormComponent } from './Transactions/redeem-form/redeem-form.component';
import { RedeemComponent } from './Transactions/redeem/redeem.component';
import { FiveKaizenComponent } from './Reports/Top5KaizenReports/five-kaizen/five-kaizen.component';
import { CategoryReportComponent } from './Reports/category-report/category-report.component';
import { KaizenStatusReportComponent } from './Reports/kaizen-status-report/kaizen-status-report.component';
import { BestKaizenComponent } from './Reports/best-kaizen/best-kaizen.component';
import { UserFormsComponent } from './Master/Users/user-forms/user-forms.component';
import { UserComponent } from './Master/Users/user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "Companies",
    component: CompanyformComponent
  }, {
    path: "companyForm",
    component: CompanyComponent
  }
  ,
  {
    path: "department",
    component: DepartmentComponent
  },
  {
    path: "plant",
    component: PlantComponent
  },
  {
    path: "userRights",
    component: UserRightsComponent
  },
  {
    path: "userRightsForm",
    component: UserRightFormComponent
  },
  {
    path: "users",
    component: UserComponent
  },
  {
    path: "level",
    component: LevelsComponent
  },
  {
    path: "dashBoard",
    component: DashBoard2Component
  },
  {
    path: "Employee",
    component: EmployeeComponent
  },
  {
    path: "EmployeeForm",
    component: EmployeeFormComponent
  },
  {
    path: "kaizenForm",
    component: KaizenFormsComponent
  },
  {
    path: "kaizen",
    component: KaizenComponent
  },
  {
    path: "Approval",
    component: ApprovalComponent
  },
  {
    path: "giftupload",
    component: GiftUploadComponent
  },
  {
    path: "redeemForms",
    component: RedeemFormComponent
  },
  {
    path: "redeem",
    component: RedeemComponent
  },
  {
    path: "TopFiveIP",
    component: FiveKaizenComponent
  },
  {
    path: "Categories",
    component: CategoryReportComponent
  },
  {
    path: "ApprovalStatusReport",
    component:KaizenStatusReportComponent
  },
  {
    path:"BestIps",
    component:BestKaizenComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
