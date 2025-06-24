import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResp, AuthServiceController, AuthServiceControllerMethods, LoginAuthDto, RegisterAuthDto, SessionUserModel, UserDataCallback } from 'proto/generated/proto/auth';
import { Observable } from 'rxjs';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  
  async logIn(request: LoginAuthDto): Promise<AuthResp> {
    const result = await this.authService.logIn(request)
    return result
  }
  async register(request: RegisterAuthDto): Promise<AuthResp> {
    const result = await  this.authService.register(request)
    return result
  }
  async refreshToken(request: SessionUserModel): Promise<AuthResp> {
    const result = await this.authService.refreshToken(request)
    return result;
  }
  async googleCallback(request: UserDataCallback): Promise<AuthResp> {
     const result = await this.authService.googleCallback(request)
    return result;
  }
}
