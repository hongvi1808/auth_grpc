import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      database: process.env.MYSQL_DB_NAME,
      username: process.env.MYSQL_USER_NAME,
      password:process.env.MYSQL_PASSWORD,
      // entities: [__dirname + '**/*.entity{.ts,.js}'],
      entities: [UserEntity],
      synchronize: true,

    }),
    AuthModule,
     UserModule, 
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
