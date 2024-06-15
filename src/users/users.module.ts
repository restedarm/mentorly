import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { Module } from '@nestjs/common';
import { CryptoModule } from 'src/helpers/crypto/crypto.module';
import { CryptoService } from 'src/helpers/crypto/crypto.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [CryptoModule, SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, CryptoService],
  exports: [UsersService],
})
export class UsersModule {}
