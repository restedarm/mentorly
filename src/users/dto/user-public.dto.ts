import { Expose } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { FieldDto } from 'src/fields/field.dto';

export class UserPublicDto extends CreateUserDto {
  constructor(user: any) {
    super();
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.type = user.type;
    this.position = user.position;
    this.fieldId = user.fieldId;
    this.description = user.description;
    this.email = user.email;
    this.education = user.education;
    this.experience = user.experience;
    this.about = user.about;
    this.field = new FieldDto(user.field);
    this.createdAt = user.createdAt;
  }
  id: number;
  field: FieldDto;
  createdAt: string;
}
