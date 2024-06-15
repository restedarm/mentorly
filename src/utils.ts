import { NotFoundException } from '@nestjs/common';

export function assertNotNull(entity) {
  if (!entity) {
    throw new NotFoundException();
  }
}
