import { DatePipe } from "@angular/common";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  responseType: "text" as "json",
};

@Injectable({
  providedIn: "root",
})

export class constant {
  static readonly master_url: string = 'http://103.168.18.134/IPSystemAPI/'
  //static readonly master_url: string = 'http://103.168.18.134/'
 // static readonly master_url : string = 'http://localhost:7286/'
  //static readonly master_url : string = 'http://103.85.89.91:5000/'
  //static readonly master_url: string = 'http://192.168.5.14:5000/'

  //Login
  static readonly UserAuthentication: string = 'api/UserAuthentication/UserAuthentication';
  UserAuthentication(): string { return constant.master_url + constant.UserAuthentication; }

  //Menus
  static readonly GetAllMenu: string = 'api/Menus/GetAllMenu';
  GetAllMenu(): string { return constant.master_url + constant.GetAllMenu; }


  //Master
  //Companies
  static readonly InsertCompany: string = 'api/Companies/InsertCompany';
  InsertCompany(): string { return constant.master_url + constant.InsertCompany; }

  static readonly GetAllCompany: string = 'api/Companies/GetAllCompany';
  GetAllCompany(): string { return constant.master_url + constant.GetAllCompany; }

  static readonly GetCompanyById: string = "api/Companies/GetIdByCompany";
  GetCompanyById(): string { return constant.master_url + constant.GetCompanyById; }

  static readonly UpdateCompany: string = "api/Companies/UpdateCompany";
  UpdateCompany(): string { return constant.master_url + constant.UpdateCompany; }

  //Plants
  static readonly InsertPlant: string = 'api/Plants/InsertPlant';
  InsertPlant(): string { return constant.master_url + constant.InsertPlant; }

  static readonly UpdatePlant: string = 'api/Plants/UpdatePlant';
  UpdatePlant(): string { return constant.master_url + constant.UpdatePlant; }

  static readonly GetAllPlant: string = 'api/Plants/GetAllPlant';
  GetAllPlant(): string { return constant.master_url + constant.GetAllPlant; }

  static readonly GetPlantById: string = 'api/Plants/GetPlantById';
  GetPlantById(): string { return constant.master_url + constant.GetPlantById; }


  //Department
  static readonly InsertDepartment: string = 'api/Departments/InsertDepartment';
  InsertDepartment(): string { return constant.master_url + constant.InsertDepartment; }

  static readonly UpdateDepartment: string = 'api/Departments/UpdateDepartment';
  UpdateDepartment(): string { return constant.master_url + constant.UpdateDepartment; }

  static readonly GetAllDepartment: string = "api/Departments/GetAllDepartment";
  GetAllDepartment(): string { return constant.master_url + constant.GetAllDepartment; }

  static readonly GetDepartmentById: string = "api/Departments/GetDepartmentById";
  GetDepartmentById(): string { return constant.master_url + constant.GetDepartmentById; }

  static readonly GetDepartmentDropDown: string = "api/Departments/GetDepartmentDropDown";
  GetDepartmentDropDown(): string { return constant.master_url + constant.GetDepartmentDropDown; }

  //UserRights
  static readonly GetAllUserRights: string = "api/UserRights/GetAllUserRights";
  GetAllUserRights(): string { return constant.master_url + constant.GetAllUserRights; }

  static readonly InsertUserRights: string = "api/UserRights/InsertUserRights";
  InsertUserRights(): string { return constant.master_url + constant.InsertUserRights; }

  static readonly GetUserRightsMenu: string = "api/UserRights/GetAllMenu";
  GetUserRightsMenu(): string { return constant.master_url + constant.GetUserRightsMenu; }

  static readonly GetAllRights: string = "api/UserRights/GetAllRights";
  GetAllRights(): string { return constant.master_url + constant.GetAllRights; }

  //Levels
  static readonly InsertLevels: string = "api/Levels/InsertLevels";
  InsertLevels(): string { return constant.master_url + constant.InsertLevels; }

  static readonly UpdateLevels: string = "api/Levels/UpdateLevels";
  UpdateLevels(): string { return constant.master_url + constant.UpdateLevels; }

  static readonly GetAllLevels: string = "api/Levels/GetAllLevels";
  GetAllLevels(): string { return constant.master_url + constant.GetAllLevels; }

  static readonly GetLevelsById: string = "api/Levels/GetLevelsById";
  GetLevelsById(): string { return constant.master_url + constant.GetLevelsById; }

  static readonly DeleteLevels: string = "api/Levels/DeleteLevels";
  DeleteLevels(): string { return constant.master_url + constant.DeleteLevels; }


  //Employees
  static readonly GetAllEmployees: string = "api/Employees/GetAllEmployees";
  GetAllEmployees(): string { return constant.master_url + constant.GetAllEmployees; }

  static readonly GetAllEmployeesDropDown: string = "api/Employees/GetAllEmployeesDropDown";
  GetAllEmployeesDropDown(): string { return constant.master_url + constant.GetAllEmployeesDropDown; }

  static readonly InsertEmployees: string = "api/Employees/InsertEmployees";
  InsertEmployees(): string { return constant.master_url + constant.InsertEmployees; }

  static readonly UpdateEmployees: string = "api/Employees/UpdateEmployees";
  UpdateEmployees(): string { return constant.master_url + constant.UpdateEmployees; }

  static readonly GetEmployeesById: string = "api/Employees/GetEmployeesById";
  GetEmployeesById(): string { return constant.master_url + constant.GetEmployeesById; }

  static readonly ImportEmployee: string = "api/Employees/ImportEmployee";
  ImportEmployee(): string { return constant.master_url + constant.ImportEmployee; }

  static readonly ExportEmployeesTemplate: string = "api/Employees/ExportEmployeesTemplate";
  ExportEmployeesTemplate(): string { return constant.master_url + constant.ExportEmployeesTemplate; }

  //kaizen  
  static readonly GetAllKaizenDropDown: string = "api/Kaizen/GetAllKaizenDropDown";
  GetAllKaizenDropDown(): string { return constant.master_url + constant.GetAllKaizenDropDown; }

  static readonly InsertKaizen: string = "api/Kaizen/InsertKaizen";
  InsertKaizen(): string { return constant.master_url + constant.InsertKaizen; }

  static readonly UpdateKaizen: string = "api/Kaizen/UpdateKaizen";
  UpdateKaizen(): string { return constant.master_url + constant.UpdateKaizen; }

  static readonly GetAllKaizen: string = "api/Kaizen/GetAllKaizen";
  GetAllKaizen(): string { return constant.master_url + constant.GetAllKaizen; }

  static readonly ExportKaizenTemplate: string = "api/Kaizen/ExportKaizenTemplate";
  ExportKaizenTemplate(): string { return constant.master_url + constant.ExportKaizenTemplate; }

  static readonly GetKaizenById: string = "api/Kaizen/GetKaizenById";
  GetKaizenById(): string { return constant.master_url + constant.GetKaizenById; }

  static readonly ImportKaizen: string = "api/Kaizen/ImportKaizen";
  ImportKaizen(): string { return constant.master_url + constant.ImportKaizen; }

  //Approval

  static readonly GetApprovalDropDown: string = "api/Approval/GetApprovalDropDown";
  GetApprovalDropDown(): string { return constant.master_url + constant.GetApprovalDropDown; }

  static readonly GetAllApprove: string = "api/Approval/GetAllApprove";
  GetAllApprove(): string { return constant.master_url + constant.GetAllApprove; }


  //DashBoard
  static readonly GetDashBoardData: string = "api/DashBoard2/GetDashBoardData";
  GetDashBoardData(): string { return constant.master_url + constant.GetDashBoardData; }

  static readonly GetLeaderBoardDetail: string = "api/DashBoard2/GetLeaderBoardDetail";
  GetLeaderBoardDetail(): string { return constant.master_url + constant.GetLeaderBoardDetail; }

  static readonly GetDashBoardDropdDown: string = "api/DashBoard2/GetDashBoardDropdDown";
  GetDashBoardDropdDown(): string { return constant.master_url + constant.GetDashBoardDropdDown; }

  static readonly DownloadGiftPDF: string = "api/DashBoard2/DownloadGiftPDF";
  DownloadGiftPDF(): string { return constant.master_url + constant.DownloadGiftPDF; }
  //ImportGiftPDF
  static readonly ImportGiftPDF: string = "api/Kaizen/ImportGiftPDF";
  ImportGiftPDF(): string { return constant.master_url + constant.ImportGiftPDF; }

  //Redeem
  static readonly InsertRedeem: string = "api/Redeem/InsertRedeem";
  InsertRedeem(): string { return constant.master_url + constant.InsertRedeem; }

  static readonly GetRedeemDropDown: string = "api/Redeem/GetRedeemDropDown";
  GetRedeemDropDown(): string { return constant.master_url + constant.GetRedeemDropDown; }

  static readonly GetRedeem: string = "api/Redeem/GetRedeem";
  GetRedeem(): string { return constant.master_url + constant.GetRedeem; }

  static readonly UpdateRedeem: string = "api/Redeem/UpdateRedeem";
  UpdateRedeem(): string { return constant.master_url + constant.UpdateRedeem; }

  static readonly GetRedeemById: string = "api/Redeem/GetRedeemById";
  GetRedeemById(): string { return constant.master_url + constant.GetRedeemById; }

  static readonly GetProductsFromPoints: string = "api/Redeem/GetProductsFromPoints";
  GetProductsFromPoints(): string { return constant.master_url + constant.GetProductsFromPoints; }


  //Reports
  static readonly GetReportsDropDown: string = "api/Reports/GetReportsDropDown";
  GetReportsDropDown(): string { return constant.master_url + constant.GetReportsDropDown; }

  static readonly ExportData: string = "api/Reports/ExportData";
  ExportData(): string { return constant.master_url + constant.ExportData; }

  static readonly getReportUrl: string = "api/Reports/getReportUrl";
  getReportUrl(): string { return constant.master_url + constant.getReportUrl; }



  static readonly TopCategoriesReportFile: string = "api/Reports/TopCategoriesReportFile";
  TopCategoriesReportFile(): string { return constant.master_url + constant.TopCategoriesReportFile; }

  static readonly KaizenStatusReportFile: string = "api/Reports/KaizenStatusReportFile";
  KaizenStatusReportFile(): string { return constant.master_url + constant.KaizenStatusReportFile; }

  static readonly BestKaizenReportFile: string = "api/Reports/BestKaizenReportFile";
  BestKaizenReportFile(): string { return constant.master_url + constant.BestKaizenReportFile; }

  static readonly BestKaizen: string = "api/Reports/BestKaizen";
  BestKaizen(): string { return constant.master_url + constant.BestKaizen; }

  //Users
  static readonly InsertUsers: string = "api/Users/InsertUsers";
  InsertUsers(): string { return constant.master_url + constant.InsertUsers; }

  static readonly UpdateUsers: string = "api/Users/UpdateUsers";
  UpdateUsers(): string { return constant.master_url + constant.UpdateUsers; }

  static readonly GetUserById: string = "api/Users/GetUserById";
  GetUserById(): string { return constant.master_url + constant.GetUserById; }

  static readonly GetAllUser: string = "api/Users/GetAllUser";
  GetAllUser(): string { return constant.master_url + constant.GetAllUser; }



  // constructor(private datePipe: DatePipe) { }
  //Guid Creation Function
  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //getLocal Storage
  public GetLocalStorage(key: any): any {
    let local_data: any = {};
    local_data = JSON.parse(localStorage.getItem("localData") || '{}');
    return local_data[key]
  }






}   