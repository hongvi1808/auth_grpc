import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repository';
import { CreateUserDto } from 'proto/generated/proto/user';
import { UserEntity } from './user.entity';
import { uuidv7 } from 'uuidv7';
import * as bcrypt from 'bcrypt';
import { genRandomPassword } from 'src/configs/utils';


@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepo) { }
    async createUser(data: CreateUserDto, password?: string) {
        const pass = password || genRandomPassword()
        const hash = bcrypt.hashSync(pass, 10)
        const createData: UserEntity = {
            id: uuidv7(),
            fullName: data.fullName,
            username: data.phoneNumber || data.email || '',
            phoneNumber: data.phoneNumber,
            email: data.email,
            hash,
            birthDate: data.birthDate,
            createdBy: data.phoneNumber || data.email || '',
            updatedBy: data.phoneNumber || data.email || '',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        }
        return this.userRepo.createUser(createData)
    }
    async getUserById(id:string) {
        return this.userRepo.getUserById(id)
    }
    async getUserByUsername(username:string) {
        return this.userRepo.getUserByUsername(username)
    }
}
