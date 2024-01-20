import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ValidatorsService } from 'src/app/Master/Validation/validators.service';
import { KaizenService } from '../kaizen.service';
import { constant } from 'src/app/app.constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kaizen } from './kaizen';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-kaizen-forms',
  templateUrl: './kaizen-forms.component.html',
  styleUrls: ['./kaizen-forms.component.css'],
  providers: [DatePipe, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }]
})
export class KaizenFormsComponent implements OnInit {
  selectedCategoryIds: any;
  @ViewChildren('checkboxRef') checkboxes1!: QueryList<MatCheckbox>;

  date: Date | undefined;
  formKaizen: FormGroup;
  btnText: string = "Save";
  department: any;
  DepartmentFilter: any;
  Company: any;
  PlantS: any;
  Totem: any[] = [];
  TotemFilter: any[] = [];
  Status: any;
  guid = this.constant.generateGUID();
  Category: any[] = [];
  CompanyId: string = this.constant.GetLocalStorage("CompanyId");
  UserId: string = this.constant.GetLocalStorage("userId");
  AuthorId: string = "";
  ResponsibleUser: any[] = [];
  ResponsibleUserFilter: any[] = [];
  User: any[] = [];
  UserFilter: any[] = [];
  KaizenId: string = "";
  Action: string = "";
  CategoryCheckBox: any;
  isChecked: boolean = false;
  categoriesIds: any[] = [];
  FormType: string = "";

  selectControl = new FormControl();
  isSelectDisabled = true;
  objKaizen: Kaizen = {};
  categoryIds: any[] = [];
  Manager: any[] = [];
  ManagerFilter: any[] = [];
  IsApprovedData = false;
  IsReadOnly: boolean = false;
  number: string = "";

  constructor(private fb: FormBuilder, public validationService: ValidatorsService, private router: Router,
    private kaizenServices: KaizenService, private snackBar: MatSnackBar, private constant: constant, private datePipe: DatePipe, private route: ActivatedRoute,) {
    this.formKaizen = this.fb.group({
      Number: ['', Validators.required],
      // Department: ['', Validators.required],
      Company: [this.CompanyId, Validators.required],
      Plant: [undefined, Validators.required],
      Totem: ['', Validators.required],
      CreatedDate: [new Date(), Validators.required],
      CostSaving: [0],
      Status: ['', Validators.required],
      ResponsibleUser: [''],
      ImplementedDate: [new Date(), Validators.required],
      Proposal: [''],
      Results: [''],
      Scope: [''],
      CategoryId: this.fb.array([]),
      JustDID: [true],
      User: ['', Validators.required],
      ManagerId: ['', Validators.required],
      LevelLabel: [''],
      PointLabel: [''],
      KWLabel: ['']
    }),
      this.formKaizen.get('Plant')?.valueChanges.subscribe((value) => {
        const selectedPlant = this.formKaizen?.controls['Plant']?.value;
        this.DepartmentFilter = this.department.filter((x: { PlantId: any; }) =>
          x.PlantId == selectedPlant);
      })
      //,
      //this.initializeFormControls();
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.KaizenId = params['kaizenId'];
      this.Action = params['Action'];
      this.FormType = params['Type'];
      if (this.FormType == "Apprval") {
        this.IsApprovedData = true;
        this.btnText = "Approve";
      }
    });
    this.GetAllKaizenDropDown();
    if (this.Action === "InsertKaizen") {
      this.btnText = "Save";
      this.IsReadOnly = false;
    }
    else {
      this.btnText = "update";
      this.GetKaizenById();
      this.IsReadOnly = true;
    }

    if (this.FormType == "Apprval") {
      this.btnText = "Approve";
      this.IsReadOnly = true;
    }
  }

  async submit() {
    const Categoryids = this.getCheckedCategoryIds();
    if (Categoryids.length == 0) {
      this.snackBar.open("Please choose at least one category.", "close", {
        duration: 2000,
        panelClass: ['error-snack-bar'],
        verticalPosition: "top",
      });
    }
    else {
      this.objKaizen.userId = this.formKaizen.controls["User"].value;
      this.objKaizen.no = this.formKaizen.controls["Number"].value;
      //this.objKaizen.departmentId = this.formKaizen.controls["Department"].value;
      this.objKaizen.companyId = this.formKaizen.controls["Company"].value;
      this.objKaizen.plantId = this.formKaizen.controls["Plant"].value;
      this.objKaizen.totem = this.formKaizen.controls["Totem"].value;
      this.objKaizen.date = this.Dateformat(this.formKaizen.controls["CreatedDate"].value);
      this.objKaizen.costSaving = this.formKaizen.controls["CostSaving"].value;
      this.objKaizen.status = this.formKaizen.controls["Status"].value;
      this.objKaizen.responsibleUserId = this.formKaizen.controls["ResponsibleUser"].value;
      this.objKaizen.implementedDate = this.Dateformat(this.formKaizen.controls["ImplementedDate"].value);
      this.objKaizen.proposal = this.formKaizen.controls["Proposal"].value;
      this.objKaizen.scope = this.formKaizen.controls["Scope"].value;
      this.objKaizen.categories = Categoryids;
      this.objKaizen.result = this.formKaizen.controls["Results"].value;
      this.objKaizen.justDidIt = this.formKaizen.controls["JustDID"].value;
      this.objKaizen.authorId = this.UserId;
      this.objKaizen.managerId = this.formKaizen.controls["ManagerId"].value;
      if (this.Action === "InsertKaizen") {
        this.objKaizen.kaizenId = this.guid;
        var response = await this.kaizenServices.InsertKaizen(this.objKaizen);
      }
      else {
        this.objKaizen.kaizenId = this.KaizenId;
        var response = await this.kaizenServices.UpdateKaizen(this.objKaizen);
      }
      //var response = await this.kaizenServices.InsertKaizen(this.objKaizen);
      if (response.data[0].IsSuccessful === 1) {
        this.router.navigate(['/kaizen']);
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



  getCheckedCategoryIds(): string {
    const checkedCategoryIds: string[] = [];
    const checkboxesArray = this.checkboxes1.toArray();
    checkboxesArray.forEach((checkbox: MatCheckbox) => {
      if (checkbox.checked) {
        checkedCategoryIds.push(checkbox.value);
      }
    });
    return checkedCategoryIds.join(',');
  }

  async GetKaizenById() {
    try {
    var response = await this.kaizenServices.GetKaizenById(this.KaizenId);
    // if (response.data.response[0] && response.data.response[0].length > 0) {
      this.formKaizen.controls["Number"].patchValue(response.data.response[0].No);
      //this.formKaizen.controls["Department"].patchValue(response.data.response[0].DepartmentId);
      this.formKaizen.controls["Company"].patchValue(response.data.response[0].CompanyId);
      this.formKaizen.controls["Plant"].patchValue(response.data.response[0].PlantId);
      this.formKaizen.controls["Totem"].patchValue(response.data.response[0].Totem);
      this.formKaizen.controls["CostSaving"].patchValue(response.data.response[0].CostSaving);
      this.formKaizen.controls["Status"].patchValue(response.data.response[0].Status);
      this.formKaizen.controls["ResponsibleUser"].patchValue(response.data.response[0].ResposibleUserId);
      this.formKaizen.controls["ImplementedDate"].patchValue(response.data.response[0].ImplementedDate);
      this.formKaizen.controls["Proposal"].patchValue(response.data.response[0].Proposal);
      this.formKaizen.controls["Results"].patchValue(response.data.response[0].Result);
      this.formKaizen.controls["Scope"].patchValue(response.data.response[0].Scope);
      this.formKaizen.controls["JustDID"].patchValue(response.data.response[0].JustDidIt);
      this.formKaizen.controls["User"].patchValue(response.data.response[0].UserId);
      this.formKaizen.controls["ManagerId"].patchValue(response.data.response[0].ManagerId);
      this.formKaizen.controls["LevelLabel"].patchValue(response.data.response[0].LevelLabel);
      this.formKaizen.controls["KWLabel"].patchValue(response.data.response[0].KWLabel);
      this.formKaizen.controls["PointLabel"].patchValue(response.data.response[0].PointsLabel);
      this.Category = [];
      this.Category = response.data.categories;
      this.categoriesIds = this.Category;
      this.selectedCategoryIds = response.data.categories
        .filter((category: { isSelected: any; }) => category.isSelected === "true")
        .map((category: { CategoryId: any; }) => category.CategoryId);
    }
    catch (error) {
     console.log(error);
     this.snackBar.open("OOps Something went wrong", "close", {
          duration: 2000,
          panelClass: ['error-snack-bar'],
          verticalPosition: "top",
        });
      }
     
    
   // } 
    // else {
    //   console.log("Data Is:", response.data);

    //   this.snackBar.open(response.length, "close", {
    //     duration: 2000,
    //     panelClass: ['error-snack-bar'],
    //     verticalPosition: "top",
    //   });
    // }
  }



  async GetAllKaizenDropDown() {
    var response = await this.kaizenServices.GetAllKaizenDropDown(this.guid);
    this.Category = response.data.category;
    this.department = response.data.departments;
    this.Company = response.data.companies;
    this.PlantS = response.data.plants;
    this.Status = response.data.status;
    this.Totem = response.data.totem;
    this.TotemFilter = this.Totem;
    this.ResponsibleUser = response.data.employee;
    this.ResponsibleUserFilter = this.ResponsibleUser;
    //this.formKaizen.controls["Number"].setValue(response.data.ipNumber[0].IPNumber);
    this.selectControl.disable();
    this.User = response.data.employee;
    this.UserFilter = this.User;
    this.Manager = response.data.manager;
    this.ManagerFilter = this.Manager;
  }

  get checkboxes() {
    return this.formKaizen.get('checkboxes') as FormArray;
  }

  onCheckedItem() {
    var a = this.formKaizen.get('CategoryId') as FormArray;
  }

  isSelected(categoryId: string): boolean {
    // Check if the categoryId matches the one you want to pre-select
    return categoryId === 'a9bdaf06-3a29-44ba-8823-74437a33fcdc';
  }

  filterTotem(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.TotemFilter = inputValue ? this.Totem.filter((opt: { Totem: string }) =>
      opt.Totem.toLowerCase().includes(inputValue)) : this.Totem;
  }
  
  filterUser(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.UserFilter = inputValue ? this.User.filter((opt: { Employee: string }) =>
      opt.Employee.toLowerCase().includes(inputValue)) : this.User;
  }


  handleImport(event: any) {

  }

  Dateformat(date: Date | null): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') ?? '';
  }

  onChange(interest: any, event: any) {

    const pendingApprovalStatus = this.Status.find((status: { Status: string; }) => status.Status === 'Pending-Approval');
    if (interest.Category === "Cost") {
      this.formKaizen.controls["Status"].patchValue(pendingApprovalStatus.StatusId);
    }

    const interests = <FormArray>this.formKaizen.get('CategoryId') as FormArray;
    if (event.checked) {
      interests.push(new FormControl(event.source.value))
    } else {
      const i = interests.controls.findIndex(x => x.value === event.source.value);
      interests.removeAt(i);
    }

  }


  filterResponsible(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.ResponsibleUserFilter = inputValue ? this.ResponsibleUser.filter((opt: { Employee: string }) =>
      opt.Employee.toLowerCase().includes(inputValue)) : this.ResponsibleUser;
  }

  filterManager(event: any) {
    const inputElement = event.target as HTMLInputElement | null;
    const inputValue = (inputElement?.value.trim().toLowerCase() || '').toLowerCase();
    this.ManagerFilter = inputValue ? this.Manager.filter((opt: { Manager: string }) =>
      opt.Manager.toLowerCase().includes(inputValue)) : this.Manager;
  }
  on_cancel_button() {
    this.router.navigate(['/kaizen']);
  }

  openDynamicUrl() {
    this.number = this.formKaizen.controls["Number"].value;
    const url = `https://gf-web-ipsystemwebapp-p-azwe.azurewebsites.net/Home/AddEdit/${this.formKaizen.controls["Number"].value}?source=HomeController#loaded`;
    window.open(url, '_blank');
  }
}
