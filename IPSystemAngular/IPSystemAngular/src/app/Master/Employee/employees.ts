export interface Employees {
    EmployeId?: string;
    SAPId?: string;
    ShortalInitial?: string;
    Employee?: string;
    JobTitle?: string;
    Department?: string;
    DateOfJoin?: string;
    UserId?: string;
    Action?: string;
}

export interface EmployeeBase {
    UserId?: string;
    employeeImportDetails?: EmployeeImportDetail[] | null;
}

export interface EmployeeImportDetail {
    SrNo?: number;
    SAPId?: number;
    ShortalInitial?: string;
    Employee?: string;
    JobTitle?: string;
    Department?: string;
    DateOfJoin?: string;
}