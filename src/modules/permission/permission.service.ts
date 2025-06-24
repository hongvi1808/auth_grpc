import { Injectable } from '@nestjs/common';
import { PermissionRepo } from './permission.repository';
import { RoleService } from '../role/role.service';
import { RoleType } from 'src/configs/constants';

@Injectable()
export class PermissionService {
    constructor(private readonly persRepo: PermissionRepo,) { }
    async getPersByRoleId(roleId: string) {
        const res = await this.persRepo.getPersByRoleId(roleId)
        return res;
    }
    async getPersByRoleIdAndUrl(roleId: string, url: string) {
        const res = await this.persRepo.getPersByRoleIdAndUrl(roleId, url)
        return res;
    }
}
