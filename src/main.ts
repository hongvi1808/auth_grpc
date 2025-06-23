import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_PACKAGE_NAME } from 'proto/generated/proto/auth';
import { join } from 'path';
import { AuthExceptionFilter } from './configs/auth-exception.filter';
import { USER_PACKAGE_NAME } from 'proto/generated/proto/user';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: [AUTHENTICATION_PACKAGE_NAME, USER_PACKAGE_NAME],
      protoPath: ['proto/auth.proto', 'proto/user.proto'],
      url: process.env.GRPC_CONNECTION_URL
    },
  });
  app.useGlobalFilters(new AuthExceptionFilter())
  await app.listen()

}
bootstrap();
