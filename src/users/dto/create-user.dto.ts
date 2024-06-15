import {
  IsEmail,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserType } from '../user.type';
import { IsInt } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string;

  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @IsString()
  @MaxLength(100)
  position: string;

  @IsNumber()
  fieldId: number;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(255)
  education: string;

  @IsString()
  @MaxLength(255)
  experience: string;

  @IsString()
  @MaxLength(255)
  about: string;
}
