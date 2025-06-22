import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResp, AuthServiceController, AuthServiceControllerMethods, LoginAuthDto, RegisterAuthDto, SessionUserModel } from 'proto/generated/proto/auth';
import { Observable } from 'rxjs';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async logIn(request: LoginAuthDto): Promise<AuthResp> {
    const result =  this.authService.logIn(request)
    return result
  }
  register(request: RegisterAuthDto): Promise<AuthResp> | Observable<AuthResp> | AuthResp {
    throw new Error('Method not implemented.');
  }
  refreshToken(request: SessionUserModel): Promise<AuthResp> | Observable<AuthResp> | AuthResp {
    throw new Error('Method not implemented.');
  }
}
