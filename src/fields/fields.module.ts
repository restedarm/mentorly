import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Field } from './field.model';
import { FieldsSeederService } from './fields.seeder.service';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';

@Module({
  imports: [SequelizeModule.forFeature([Field])],
  controllers: [FieldsController],
  providers: [FieldsSeederService, FieldsService],
  exports: [FieldsSeederService],
})
export class FieldsModule {}
