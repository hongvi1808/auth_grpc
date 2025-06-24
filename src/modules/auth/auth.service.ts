import { Injectable } from '@nestjs/common';
import { AuthResp, LoginAuthDto, RegisterAuthDto, SessionUserModel, UserDataCallback } from 'proto/generated/proto/auth';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { AuthExceptionFilter } from 'src/configs/auth-exception.filter';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { uuidv7 } from 'uuidv7';
import { RoleType } from 'src/configs/constants';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }
    async logIn(body: LoginAuthDto): Promise<AuthResp> {
        const userFound = await this.userService.getUserByUsername(body.phoneNumber)
        if (!userFound) throw new AuthExceptionFilter('NOT_FOUND_USER', 'This user is not existed')
        if (!bcrypt.compareSync(body.password, userFound.hash))
            throw new AuthExceptionFilter('WRONG_PASSWORD', 'The password is wrong')

        const jwtObject: SessionUserModel = {
            sid: uuidv7(),
            userId: userFound.id,
            sub: userFound.id,
            role: userFound.role || '',
            username: userFound.username
        }
        const { accessToken, expiredAt } = await this.generateAccessToken(jwtObject);
        const refreshToken = await this.generateRefreshToken(jwtObject);

        return { accessToken, refreshToken, expiredAt, userId: userFound.id }
    }

    async register(body: RegisterAuthDto): Promise<AuthResp> {
        const userFound = await this.userService.getUserByUsername(body.phoneNumber)
        if (userFound) throw new AuthExceptionFilter('EXISTED_USER', 'This user existed')
        const createUser = await this.userService.createUser({
            fullName: body.fullName,
            phoneNumber: body.phoneNumber,
            email: body.email,
            birthDate: body.birthDate,
            role: RoleType.USER,
        }, body.password);

        const jwtObject: SessionUserModel = {
            sid: uuidv7(),
            userId: createUser.id,
            sub: createUser.id,
            role: createUser.role || '',
            username: createUser.username
        }
        const { accessToken, expiredAt } = await this.generateAccessToken(jwtObject);
        const refreshToken = await this.generateRefreshToken(jwtObject);

        return { accessToken, refreshToken, expiredAt, userId: createUser.id }
    }
    async googleCallback(body: UserDataCallback): Promise<AuthResp> {
        let user: any;
        user = await this.userService.getUserByUsername(body.email)
        if (!user) {
            user = await this.userService.createUser({
                fullName: body.fullName,
                phoneNumber: '',
                email: body.email,
                birthDate: 0,
                role: RoleType.USER,
            }, );
            
        }
        const jwtObject: SessionUserModel = {
            sid: uuidv7(),
            userId: user.id,
            sub: user.id,
            role: user.role || '',
            username: user.username
        }

        const { accessToken, expiredAt } = await this.generateAccessToken(jwtObject);
        const refreshToken = await this.generateRefreshToken(jwtObject);

        return { accessToken, refreshToken, expiredAt, userId: user.id }
    }

    async refreshToken(sUser: SessionUserModel): Promise<AuthResp> {
        // find sid in session table
        sUser.sid = uuidv7()
        const { accessToken, expiredAt } = await this.generateAccessToken(sUser);
        const refreshToken = await this.generateRefreshToken(sUser);
        return { accessToken, refreshToken, expiredAt, userId: sUser.userId }
    }
    private async generateAccessToken(payload: SessionUserModel): Promise<{ accessToken: string, expiredAt: number }> {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN')
        });
        const expireAt = await this.jwtService.decode(accessToken) as { exp: number };
        return { accessToken, expiredAt: expireAt.exp * 1000 }; // Convert to milliseconds
    }
    /**
     * Generates a refresh token for the user.
     */
    private async generateRefreshToken(payload: SessionUserModel): Promise<string> {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN')
        });
    }
}
