import { Injectable } from '@nestjs/common';
import { AuthResp, AuthServiceController, LoginAuthDto, RegisterAuthDto, SessionUserModel } from 'proto/generated/proto/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    async logIn(request: LoginAuthDto): Promise<AuthResp> {
       return {accessToken: 'we', refreshToken: 'we', expiredAt: 0, userId: '123'}
    }
    register(request: RegisterAuthDto): Promise<AuthResp> | Observable<AuthResp> | AuthResp {
        throw new Error('Method not implemented.');
    }
    refreshToken(request: SessionUserModel): Promise<AuthResp> | Observable<AuthResp> | AuthResp {
        throw new Error('Method not implemented.');
    }
}
