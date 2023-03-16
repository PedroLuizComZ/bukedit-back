import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { LoginUserDto } from '../auth/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userProviders: Repository<User>,
  ) {}

  create({ firstname, surname, email, password }: CreateUserDto) {
    const userData = {
      id: uuid(),
      created_at: new Date(),
      firstname,
      surname,
      email,
      password,
    };
    return this.userProviders.save(userData);
  }

  async findAll() {
    return this.userProviders.find();
  }

  login({ email, password }: LoginUserDto) {
    return this.userProviders.findOne({ email, password });
  }

  findOne(id: number) {
    return this.userProviders.findOne(id);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.userProviders.save(updateUserDto);
  }

  remove(id: number) {
    return this.userProviders.delete(id);
  }
}
