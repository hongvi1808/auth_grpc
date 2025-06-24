import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/user.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleEnity } from './modules/role/role.entity';
import { PermissionEnity } from './modules/permission/permission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        database: process.env.MYSQL_DB_NAME,
        username: process.env.MYSQL_USER_NAME,
        password: process.env.MYSQL_PASSWORD,
        // entities: [__dirname + '**/*.entity{.ts,.js}'],
        entities: [UserEntity, RoleEnity, PermissionEnity],
        synchronize: true,

      })
    }),
    AuthModule,
    UserModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
