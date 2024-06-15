import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserType } from '../user.type';
import { DataTypes } from 'sequelize';
import { Field } from '../../fields/field.model';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  surname: string;

  @Column({
    type: DataTypes.ENUM(...Object.values(UserType)),
    defaultValue: UserType.Mentee,
    allowNull: false,
  })
  type: UserType;

  @Column
  position: string;

  @ForeignKey(() => Field)
  @Column
  fieldId: number;

  @BelongsTo(() => Field)
  field: Field;

  @Column
  description: string;

  @Column({ unique: true })
  email: string;

  @Column
  password: string;

  @Column
  education: string;

  @Column
  experience: string;

  @Column
  about: string;

  @Column
  createdAt: Date;
}
