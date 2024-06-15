import { ConflictException, Injectable } from '@nestjs/common';
import { CryptoService } from 'src/helpers/crypto/crypto.service';
import { InjectModel } from '@nestjs/sequelize';
import { assertNotNull } from 'src/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPublicDto } from './dto/user-public.dto';
import { User } from './models/user.model';
import { Field } from '../fields/field.model';
import { UserSearchDto } from './dto/user-search.dto';
import { Op } from 'sequelize';
import * as moment from 'moment';

function userToDto(user: User) {
  return user ? new UserPublicDto(user) : null;
}

@Injectable()
export class UsersService {
  constructor(
    private cryptoService: CryptoService,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async updateProfile(
    userId: number,
    updatedUser: UpdateUserDto,
  ): Promise<UserPublicDto> {
    const currentUser: User = await this.userModel.findByPk(userId, {
      include: [{ model: Field, as: 'field' }],
    });
    await currentUser.update(updatedUser);
    await currentUser.reload({
      include: [{ model: Field, as: 'field' }],
    });
    return new UserPublicDto(currentUser);
  }

  async create(user: CreateUserDto): Promise<UserPublicDto> {
    const existingUser = await this.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }
    const passwordHash = await this.cryptoService.hashPassword(user.password);
    const newUser = new this.userModel({
      ...user,
      password: passwordHash,
    });
    await newUser.save();
    await newUser.reload({ include: [{ model: Field, as: 'field' }] });
    return new UserPublicDto(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email },
      include: [{ model: Field, as: 'field' }],
    });
    return user;
  }

  async getProfile(userId: number): Promise<UserPublicDto> {
    return userToDto(
      await this.userModel.findByPk(userId, {
        include: [{ model: Field, as: 'field' }],
      }),
    );
  }

  async getById(userId: number): Promise<UserPublicDto> {
    const user = await this.getProfile(userId);
    assertNotNull(user);
    return user;
  }

  async findAllUsers(filterDto: UserSearchDto): Promise<UserPublicDto[]> {
    const whereClause: any = {};

    if (filterDto.name) {
      whereClause.name = {
        [Op.iLike]: `%${filterDto.name}%`,
      };
    }
    if (filterDto.surname) {
      whereClause.surname = {
        [Op.iLike]: `%${filterDto.surname}%`,
      };
    }
    if (filterDto.userType) {
      whereClause.type = filterDto.userType;
    }
    if (filterDto.registrationDate) {
      const startDate = moment(filterDto.registrationDate)
        .startOf('day')
        .toDate();
      const endDate = moment(filterDto.registrationDate).endOf('day').toDate();

      whereClause.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    const users = await this.userModel.findAll({
      where: whereClause,
      include: [{ model: Field, as: 'field' }],
    });

    return users.map(userToDto);
  }
}
