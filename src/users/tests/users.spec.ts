import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from '../user.providers';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('Users', () => {
  let controller: UsersController;
  let service: UsersService;
  let userId: number;
  let userData = {
    firstname: 'string',
    surname: 'string',
    email: 'string',
    password: 'string',
  };

  beforeEach(async () => {
    if (!controller || !service) {
      const module: TestingModule = await Test.createTestingModule({
        imports: [DatabaseModule, ConfigModule.forRoot()],
        controllers: [UsersController],
        providers: [...userProviders, UsersService],
      }).compile();

      controller = module.get<UsersController>(UsersController);
      service = module.get<UsersService>(UsersService);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should search for all users', async () => {
    const users = await controller.findAll();

    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('firstname');
    expect(users[0]).toHaveProperty('surname');
    expect(users[0]).toHaveProperty('password');
    expect(users[0]).toHaveProperty('email');
    expect(users[0]).toHaveProperty('created_at');
  });

  it('should create an user', async () => {
   

    const user = await controller.create(userData);
    userId = user.id

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstname');
    expect(user).toHaveProperty('surname');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('created_at');
  });

  it('should search for an especific user by id', async () => {
    const user = await controller.findOne(String(userId));

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstname');
    expect(user).toHaveProperty('surname');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('created_at');
  });

  it('should edit user', async () => {
    let updateUserData = {
      id: userId,
      ...userData
    }
    
    const user = await controller.update(updateUserData);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstname');
    expect(user).toHaveProperty('surname');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('email');
  });

  it('should search for an especific user by id', async () => {
    const result = await controller.remove(String(userId ));

    expect(result).toHaveProperty('affected');
    expect(result.affected).toBe(1);
  });

  
});
