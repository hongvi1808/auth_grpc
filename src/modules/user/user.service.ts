import { Injectable } from '@nestjs/common';
import { UserRepo } from './user.repository';
import { CreateUserDto, UserResp } from 'proto/generated/proto/user';
import { UserEntity } from './user.entity';
import { uuidv7 } from 'uuidv7';
import * as bcrypt from 'bcrypt';
import { genRandomPassword } from 'src/configs/utils';
import { AuthExceptionFilter } from 'src/configs/auth-exception.filter';


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
            roleId: data.role,
            birthDate: data.birthDate,
            createdBy: data.phoneNumber || data.email || '',
            updatedBy: data.phoneNumber || data.email || '',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        }
        return this.userRepo.createUser(createData)
    }
    async getUserById(id:string): Promise<UserResp> {
        const user = await this.userRepo.getUserById(id)
        if (!user) throw new AuthExceptionFilter('NOT_FOUND_USER', 'Khong tim thay user')
        const result: UserResp = {
            id: user.id,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            birthDate: Number(user.birthDate),
            role: user.role?.id || ''
        }
        return result
    }
    async getUserByUsername(username:string) {
        return this.userRepo.getUserByUsername(username)
    }
}
