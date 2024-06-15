import { IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSearchDto {
  @ApiProperty({ required: false, description: 'Filter by user name' })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, description: 'Filter by user surname' })
  @IsOptional()
  surname?: string;

  @ApiProperty({ required: false, description: 'Filter by user type' })
  @IsOptional()
  userType?: string;

  @ApiProperty({
    required: false,
    description: 'Filter by registration date (YYYY-MM-DD)',
    example: '2023-01-31',
  })
  @IsDateString()
  @IsOptional()
  registrationDate?: string;
}
