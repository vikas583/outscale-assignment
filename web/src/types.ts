import React from "react";

export type RouteItem = {
  path: string;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  layout: "/admin" | "/auth";
  isSidebarItem: boolean;
  allow?: UserPermissions[];
};

export enum OdOrc {
  OD = "OD",
  ORC = "ORC",
}

export enum ProjectStatus {
  Deferred = "Deferred",
  Unbilled = "Unbilled",
}

export enum ProjectFinishedStatus {
  False = "False",
  "ORC Finished" = "ORC Finished",
  "OD Finished" = "OD Finished",
}

export enum ProjectReplyStatus {
  revTeam = "revTeam", // pending from our side
  opsTeam = "opsTeam", // pending from PM's side
}

export type ProjectData = {
  code: string;
  startDate: string;
  endDate: string;
  pm: string;
  projName: string;
  _id: string;
  // normalizedName: string;
  workflowCode: string;
  vertical: string;
  lob: string;
  deliveryName: string;
  projectGroup: string;
  odOrc: OdOrc;
  odOrcBreakup: string;
  entity: string;
  projCurr: string;
  gm: string;
  avp: string;
  companyCurr: string;
  status: ProjectStatus;
  finishedStatus: ProjectFinishedStatus;
  financeRemarks?: string;
  pendingBilling: number;
  volumeDiscount: number;
  negPos: number;
  isFollowUpInProgress?: boolean;
  hasFollowUpInitiated: boolean;
  replyStatus?: ProjectReplyStatus;
  lastActivityAt?: string;
};

export type ProjectMonthlyData = {
  projectCode: string;
  year: number;
  month: number;
  openingBalanceCC: number;
  closingBalanceCC: number;
  accrualAmt: number;
  invoicingAmt: number;
  usdAmt: number;
  netAmtUsd: number;
};

export type EmailMessage = {
  _id: string;
  conversationId: string;
  messageId: string;
  subject: string;
  body: string;
  from: string;
  to: string[];
  cc: string[];
  webLink?: string;
  userId?: string;
  aggId?: string;
  createdAt: string;
};

export type ProjectResponse = {
  data:
    | undefined
    | (ProjectData & {
        monthlyData0m_ago?: Pick<
          ProjectMonthlyData,
          "year" | "month" | "openingBalanceCC" | "closingBalanceCC"
        >;
        monthlyData1m_ago?: Pick<
          ProjectMonthlyData,
          "year" | "month" | "openingBalanceCC" | "closingBalanceCC"
        >;
        monthlyData2m_ago?: Pick<
          ProjectMonthlyData,
          "year" | "month" | "openingBalanceCC" | "closingBalanceCC"
        >;
      });
};

export type ProjectEmailsResponse = {
  messages: EmailMessage[];
  total: number;
  hasMore: boolean;
};

export type UpdateProjectRequest = Pick<
  ProjectData,
  "code" | "negPos" | "volumeDiscount" | "financeRemarks"
>;

export type ProjectScheduledFollowUpResponse = {
  _id: string;
  userData: { name: string };
  projectCode: string;
  content: string;
  ts: string;
  replyAll: boolean;
  cc: string[];
};

// export type NormalizedMappingType = {
//   _id: string;
//   clientName: string;
//   normalizedName: string;
// };

// export type AddNormalizedMappingReq = {
//   clientName: string;
//   normalizedName: string;
// };

// export type UpdateNormalizedMappingReq = {
//   _id: string;
// } & AddNormalizedMappingReq;

export type User = {
  id: string;
  name: string;
  email: string;
  roles: UserPermissions[];
};

export type Book = {
  id: number;
  name: string;
  title: string;
  isPublish: boolean;
  createdAt: string;
};

export enum UserPermissions {
  admin = "admin",
  read = "read",
  write = "write",
}

export type LoginResp = {
  token: string;
  user: User;
};

export type UnbilledMonthlyReportResponse = {
  year: number;
  month: number;
  sum: number;
}[];

export type FollowUpsMonthlyReportResponse = UnbilledMonthlyReportResponse;

export type AnalyseChemicalsResponse = "processing" | "error";

export type AdminUserHeaderInfoResponse = {
  totalAdminUsers: number;
  categoriesCount: number;
  subCategoriesCount: number;
  registeredBusinessCount: number;
  totalUsers: number;
  totalBooking: number;
};

export type MyBooksList = {
  books: Book[];
  total: number;
};

export type HeaderAggDataResponse = {
  // chemCount: number;
  ongoingExecCount: number;
  completedExecCount: number;
  // avgTimeToExecuteInSeconds: number;
};

export enum ExecutionStatus {
  running = "running",
  completed = "completed",
  error = "error",
}

export type ChemicalSearchResponse = {
  data: {
    chemicalCAS: string;
    chemicalName: string;
    chemicalSynonyms?: string;
    executionStatus: ExecutionStatus;
    executionTimeTakenInSeconds?: number;
    executionStartedAt: string;
    userName: string;
    userId: number;
    groupName: string;
    groupId: number;
    executionId: number;
    chemicalId: number;
  }[];
  total: number;
};

export type ChemicalInfoResponse = {
  cas: string;
  id: number;
  name: string;
  synonyms?: string;
  executionIds: number[];
};

export type AllExtractionExecutionResponse = {
  data: {
    mode: string;
    createdAt: string;
    status: string;
    userId: number;
    userName: string;
    tableType: string;
    extractId: number;
    companyName: string;
  }[];
  total: number;
};

export enum SearchResultStatus {
  error = "error",
  success = "success",
}

export type AllSubcategoryResponse = {
  status: Boolean;
  total: number;
  data: {
    id: number;
    name: string;
    createdat: string;
    categoryName: string;
  }[];
};

export type AllCategoryResponse = {
  status: Boolean;
  total: number;
  data: {
    id: number;
    name: string;
    icon_url?: string;
    createdAt: string;
    status: Boolean;
    count: number;
  }[];
};

export type AllCategoryResponseDropdown = {
  status: Boolean;
  message: string;
  data: {
    id: number;
    name: string;
    icon_url?: string;
  }[];
};

export type Customer = {
  id: number;
  user_type: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  profile_pic_url: string;
  profile_pic: string;
  is_login: string;
  is_approved: number;
  is_active: number;
  is_mobile_verified: number;
  is_email_verified: number;
  createdAt: string;
};

export type AdminCustomersList = {
  status: boolean;
  message: string;
  data: {
    rows: Customer[];
    count: number;
  };
};

export type AdminDashboard = {
  status: boolean;
  message: string;
  data: {
    subCategoryServicesData: {
      xAxis: string;
      yAxis: string;
    }[];
  };
};

export type Business = {
  businessId: number;
  businessName: string;
  businessAddress: string;
  businessUnit: number;
  businessHST: string;
  businessWebsite: string;
  businessIsVerified: boolean;
  businessIndustryStandardAgreement: boolean;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  businessCreatedAt: string;
};

export type AdminBusinessList = {
  status: boolean;
  message: string;
  data: {
    rows: Business[];
    total: number;
  };
};

export type BusinessDetail = {
  businessId: number;
  businessName: string;
  businessAddress: string;
  businessUnit: number;
  businessHST: string;
  businessWebsite: string;
  businessIsVerified: boolean;
  businessIndustryStandardAgreement: boolean;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  businessCreatedAt: string;
};

export type AllBookingResponse = {
  status: Boolean;
  message: string;
  data: {
    total: number;
    rows: {
      bookingId: number;
      earliestDateFlag: boolean;
      timeConstraintDescription: string;
      taskDescription: string;
      isAssigned: boolean;
      isSubmitted: boolean;
      stepOneProcessed: boolean;
      stepTwoProcessed: boolean;
      bookingConfirm: boolean;
      createdAt: string;
      userId: number;
      customerFirstName: string;
      customerLastName: string;
      customerEmail: string;
      customerMobileNo: string;
      serviceName: string;
      servicePrice: number;
      businessName: string;
      businessAddress: string;
      businessStateName: string;
      serviceProviderFirstName: string;
      serviceProviderLastName: string;
      serviceProviderEmail: string;
      serviceProviderMobileNo: string;
    }[];
  };
};

export type SubCategory = {
  id?: number;
  categoryId: number;
  name: string;
  description: string;
  slug: string;
  icon_url: string;
  status: boolean;
};

export interface FileUploadResponse {
  status: boolean;
  data: {
    fileId: string;
    fileName: string;
    imageUrl: string;
  };
}

export interface FileUploadResponseData {
  fileId: string;
  fileName: string;
  imageUrl: string;
}

export interface FileUploadComponentProps {
  onFileUploaded: (uploadedFile: FileUploadResponseData) => void;
}
