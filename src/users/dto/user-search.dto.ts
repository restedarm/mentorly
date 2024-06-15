import { IsDateString, IsOptional } from "class-validator";

export class UserSearchDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  surname?: string;

  @IsOptional()
  userType?: string;

  @IsDateString()
  @IsOptional()
  registrationDate?: string;
}
