import { Injectable } from '@nestjs/common';
import { RoleRepo } from './role.repository';
import { AuthExceptionFilter } from 'src/configs/auth-exception.filter';
import { RoleType } from 'src/configs/constants';

@Injectable()
export class RoleService {
    constructor(private readonly roleRepo: RoleRepo) {}
    async getRoleIdByName(name: string) {
        const res = await this.roleRepo.getRoleIdByName(name)
        if (!res) throw new AuthExceptionFilter('NOT_FOUND_ROLE', 'Not found role')
        return res?.id
    }
    async getRoleIdAdmin() {
        const res = await this.roleRepo.getRoleIdByName(RoleType.ADMIN)
        return res?.id
    }
}
