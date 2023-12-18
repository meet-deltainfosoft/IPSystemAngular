export interface UserRights {
    ParentMenuId?: string;     
    EndUserId?: string;    
    UserId?: string; 
    UT_UserRights?: UTUserRights[];
}
export interface UTUserRights {
    menuId?: string;
    allowInsert?: boolean;
    allowUpdate?: boolean;
    allowDelete?: boolean;
  }