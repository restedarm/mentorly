import { Controller, Get } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldDto } from './field.dto';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Get()
  async getAllFields(): Promise<FieldDto[]> {
    return this.fieldsService.findAll();
  }
}