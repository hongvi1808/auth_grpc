import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnity } from './role.entity';

@Injectable()
export class RoleRepo {
    constructor(
        @InjectRepository(RoleEnity) private dbRepo: Repository<RoleEnity>
    ) {}
    async getRoleIdByName(name: string) {
        const res = await this.dbRepo.findOneBy({name, alive: true})
        return res
    }
}
