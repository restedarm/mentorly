import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { CryptoModule } from 'src/helpers/crypto/crypto.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    CryptoModule,
    JwtModule.register({
      secret: config.jwt.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
