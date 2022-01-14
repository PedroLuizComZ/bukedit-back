import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userProviders: Repository<User>,
  ) {}

  create({ firstname, surname, email, password }: CreateUserDto) {
    const userData = {
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
