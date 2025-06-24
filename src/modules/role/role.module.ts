import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEnity } from './role.entity';
import { RoleRepo } from './role.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEnity])],
  controllers: [RoleController],
  providers: [RoleService, RoleRepo],
  exports: [RoleService]
})
export class RoleModule {}
