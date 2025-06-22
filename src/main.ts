import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_PACKAGE_NAME } from 'proto/generated/proto/auth';
import { join } from 'path';
import { AuthExceptionFilter } from './configs/auth-exception.filter';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: AUTHENTICATION_PACKAGE_NAME,
      protoPath: join('proto/auth.proto'),
      url: process.env.GRPC_CONNECTION_URL
    },
  });
  app.useGlobalFilters(new AuthExceptionFilter())
  await app.listen()

}
bootstrap();
