import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEnity } from './permission.entity';
import { PermissionRepo } from './permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEnity]),],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepo],
  exports: [PermissionService]
})
export class PermissionModule {}
