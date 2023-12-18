export interface Approval {
    FromDate?: string;
    ToDate?: string;
    PlantIds?: string | null;
    UserIds?: string;
    KaizenIds?: string | null;
    StatusId?:string|null;
    Action?: string;
}
