export interface Company {
    CompanyId?: string ;
    Company?: string ;
    Address?: string ;
    Contact?: string ;
    City?: string ;
    Pincode?: string ;
    CompanyCode?:string;
    GstNumber?: string;
    UserId?: string;
    lineDetails?: LineDetail[]; 
}

export interface LineDetail {
    lineDetailId?: string;
    companyId?: string;
    address?: string;
    contact?: string;
    isNew?: boolean;
    isDirty?: boolean;
    isDelete?: boolean;
  }