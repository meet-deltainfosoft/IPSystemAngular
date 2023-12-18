export interface Kaizen {
    kaizenId?: string;
    no?: string;
    date?: string;
    justDidIt?: boolean;
    proposal?: string;
    categories?: string;
    result?: string;
    scope?: string;
    userId?: string;
    departmentId?: string;
    companyId?: string;
    plantId?: string;
    totem?: string;
    costSaving?: number;
    status?: string;
    responsibleUserId?: string;
    implementedDate?: string;
    beforeImprovementFilePath?: string;
    afterImprovementFilePath?: string;
    authorId?: string;
    action?: string;
    managerId?:string;
}

export interface BaseKaizen {
    AuthorId?: string;
    ImportKaizen?: ImportKaizen[];
  }
  
  // import-kaizen.interface.ts
  export interface ImportKaizen {
    Id?: string;
    Category?: string;
    Scope?: string;
    Status?: string;
    Theme?: string;
    Company?:string;
    CostSaving?: number;
    DateImplemented?: string;
    Remarks?: string;
    Plant?: string;
    Totem?: string;
    Ideaowner?: string;
    ResponsibleforImplementation?: string;
    Manager?: string;
    JustDIDIt?: string;
  }
