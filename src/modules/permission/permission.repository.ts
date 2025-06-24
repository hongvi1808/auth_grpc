import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEnity } from './permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionRepo {
    constructor(@InjectRepository(PermissionEnity) private dbRepo: Repository<PermissionEnity>) { }

    async getPersByRoleId(roleId: string) {
        const res = await this.dbRepo.find({
            where: { id: roleId, alive: true },
            relations: ['roles'],  // load quan hệ role
        })
        return res;
    }
    async getPersByRoleIdAndUrl(roleId: string, url: string) {
        const res = await this.dbRepo.findOne({
            where: { url, alive: true, active: true, roles: {id: roleId} },
            relations: ['roles'],  // load quan hệ role
        })
        return res;
    }

}
