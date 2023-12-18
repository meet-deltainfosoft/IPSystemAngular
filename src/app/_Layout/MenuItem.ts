export interface MenuItem {
  ChildId: string;
  ChildDescription: string;
  Routing: string;
  Icon: string;
  AllowInsert: boolean;
  AllowUpdate: boolean;
  AllowDelete: boolean;
  Parent : string
}