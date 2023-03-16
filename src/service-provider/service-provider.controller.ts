import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Controller('service-provider')
export class ServiceProviderController {
  constructor(
    private readonly serviceProviderService: ServiceProviderService,
  ) {}

  @Post()
  async create(
    @Headers() headers,
    @Body() createServiceProviderDto: CreateServiceProviderDto,
  ) {
    const jwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1080000s' },
    });
    const result = jwtService.verify(headers.authorization);
    const response = await this.serviceProviderService.create(
      createServiceProviderDto,
      result.sub,
    );

    if (response.status === 'error') {
      throw new HttpException(response, 400);
    }

    return response;
  }

  @Get()
  findAll() {
    return this.serviceProviderService.findAll();
  }

  @Get('list-by-user')
  listByUser(@Headers() headers) {
    const jwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1080000s' },
    });
    const result = jwtService.verify(headers.authorization);
    return this.serviceProviderService.listByUser(result.sub);
  }

  @Get(':id')
  findOne(@Headers() headers, @Param('id') id: string) {
    const jwtService = new JwtService({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1080000s' },
    });
    const result = jwtService.verify(headers.authorization);
    return this.serviceProviderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    return this.serviceProviderService.update(id, updateServiceProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceProviderService.remove(id);
  }
}
