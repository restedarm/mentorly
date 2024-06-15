import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptoService {
  async hashPassword(password): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async checkPassword(password, hashedPassword): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
