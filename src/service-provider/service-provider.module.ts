import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderController } from './service-provider.controller';
import { CheckAuthToken } from 'src/auth/check-auth-token.service';

@Module({
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService],
})
export class ServiceProviderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuthToken).forRoutes('/service-provider');
  }
}
