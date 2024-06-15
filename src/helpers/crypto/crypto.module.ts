import { CryptoService } from './crypto.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
