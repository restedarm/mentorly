import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Field } from './field.model';
import { fieldsData } from './fields.data';

@Injectable()
export class FieldsSeederService {
  constructor(
    @InjectModel(Field)
    private fieldModel: typeof Field,
  ) {}

  async seed() {
    try {
      await Promise.all(
        fieldsData.map(async (data) => {
          await this.fieldModel.findOrCreate({
            where: { name: data.name },
            defaults: data,
          });
        }),
      );
      console.log('Fields seeded successfully.');
    } catch (error) {
      console.error('Error seeding fields:', error);
    }
  }
}
