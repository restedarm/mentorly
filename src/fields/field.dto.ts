export class FieldDto {
  constructor(field: Partial<FieldDto>) {
    this.id = field.id;
    this.name = field.name;
  }

  id: number;
  name: string;
}
