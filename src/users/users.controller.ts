import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPublicDto } from './dto/user-public.dto';
import { UsersService } from './users.service';
import { UserSearchDto } from './dto/user-search.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserPublicDto> {
    return this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  async update(
    @Request() req,
    @Body() user: UpdateUserDto,
  ): Promise<UserPublicDto> {
    return this.usersService.updateProfile(req.user.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req): Promise<UserPublicDto> {
    return this.usersService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async get(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserPublicDto> {
    return this.usersService.getById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUsers(
    @Query() filterDto: UserSearchDto,
  ): Promise<UserPublicDto[]> {
    return this.usersService.findAllUsers(filterDto);
  }
}
