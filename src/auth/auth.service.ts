import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/helpers/crypto/crypto.service';
import { UserPublicDto } from 'src/users/dto/user-public.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(username);
    if (user && (await this.cryptoService.checkPassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      sessionToken: this.jwtService.sign(payload),
    };
  }
}
