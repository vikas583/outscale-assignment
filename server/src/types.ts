import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import Mail from "nodemailer/lib/mailer";

export interface IMail {
  to: string[];
  content: string;
  subject: string;
  attachments?: Mail.Attachment[];
  cc?: string[];
}

export enum UserPermissions {
  admin = "admin",
  read = "read",
  write = "write",
}

export interface TokenData {
  email: string;
  id: number;
}

export class CreateUserRequest {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsArray()
  @IsEnum(UserPermissions, { each: true })
  roles: UserPermissions[];
}

export class SkipLimitURLParams {
  @Matches(/^\d+$/)
  skip: string;

  @Matches(/^\d+$/)
  @IsNotIn(["0"])
  limit: string;
}

export class DeleteUserRequest {
  @IsNumber()
  id!: number;
}

export class AdminSearchParams extends SkipLimitURLParams {
  @MinLength(1)
  name: string;
}

export class PastExecutionQueryParams extends SkipLimitURLParams {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}

export type ExtractTablePresignedURLAPIResponse = {
  fields: {
    AWSAccessKeyId: string;
    "Content-Type": string;
    acl: string;
    key: string;
    policy: string;
    signature: string;
    "x-amz-security-token": string;
  };
  url: string;
};

export type ExtractTableJobStatuses =
  | "Success"
  | "Failed"
  | "Incomplete"
  | "Processing";

export type ExtractTableTriggerAPIResponse = {
  JobId: string;
  JobStatus: ExtractTableJobStatuses;
  message: string;
};

export type ExtractTableResultAPIResponse = {
  JobStatus: ExtractTableJobStatuses;
  Pages: number;
  Tables: {
    CharacterConfidence?: number;
    LayoutConfidence: number;
    Page: number;
    TableJson: Record<string, Record<string, any>>;
    TableType?: string;
    ConfidenceScore?: number;
  }[];
};

export enum ExtractStatus {
  completed = "completed",
  running = "running",
  error = "error",
}

export enum ExtractMode {
  "camelot" = "camelot",
  "extracttable" = "extracttable",
}

export class AllExecutionStatuses extends SkipLimitURLParams {
  @IsString()
  executionStatuses: ExtractStatus;
}

export class CompanySuggestionParams {
  @IsString()
  @Matches(/[\w\s\-]*/i)
  searchTerm: string;
}

export class ExecutionSearchParams extends AllExecutionStatuses {
  @IsOptional()
  @IsString()
  @Matches(/[\w\s\-]+/i)
  searchTerm?: string;
}

export enum ResponseStatus {
  SUCCESS = 200,
  ERROR = 500,
  NOT_FOUND = 400,
}

export class SignupRequest {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class LoginRequest {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class BookPublishRequest {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsBoolean()
  isPublish: boolean;
}
