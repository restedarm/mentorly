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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'Doe', description: 'The surname of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  surname: string;

  @ApiProperty({
    enum: UserType,
    example: UserType.Mentee,
    description: 'The type of the user (ADMIN, USER, etc.)',
  })
  @IsNotEmpty()
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({ example: 'Manager', description: 'The position of the user' })
  @IsString()
  @MaxLength(100)
  position: string;

  @ApiProperty({ type: Number, example: 1, description: 'The ID of the field' })
  @IsNumber()
  fieldId: number;

  @ApiProperty({ example: 'Description of the user' })
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @ApiProperty({
    example: 'Ph.D. in Computer Science',
    description: 'The education background of the user',
  })
  @IsString()
  @MaxLength(255)
  education: string;

  @ApiProperty({
    example: '5 years as a software developer',
    description: 'The experience of the user',
  })
  @IsString()
  @MaxLength(255)
  experience: string;

  @ApiProperty({
    example: 'About me...',
    description: 'Additional information about the user',
  })
  @IsString()
  @MaxLength(255)
  about: string;
}
