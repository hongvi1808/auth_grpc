import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';


@Injectable()
export class UserRepo {
    constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ){}
    async createUser(data: UserEntity) {
        return this.userRepo.save(data, {data: true})
    }

    async getUserById(id:string) {
        return this.userRepo.findOneBy({id, alive: true})
    }
    async getUserByUsername(username:string) {
        return this.userRepo.findOneBy({username, alive: true})
    }
}
