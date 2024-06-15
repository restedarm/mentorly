import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from './field.model';
import { FieldDto } from './field.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(Field)
    private fieldModel: typeof Field,
  ) {}

  async findAll(): Promise<FieldDto[]> {
    const dbFields = await this.fieldModel.findAll();
    return dbFields.map((f) => new FieldDto(f));
  }
}
