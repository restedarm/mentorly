import { Column, Table, Model } from 'sequelize-typescript';
@Table
export class Field extends Model<Field> {
  @Column({ unique: true })
  name: string;
}
