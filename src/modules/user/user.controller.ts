import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserResp, FilterParam, UserResp, UserServiceController, UserServiceControllerMethods } from 'proto/generated/proto/user';
import { Observable } from 'rxjs';

@Controller('user')
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {
  }
  createUser(request: CreateUserDto): Promise<CreateUserResp> | Observable<CreateUserResp> | CreateUserResp {
    throw new Error('Method not implemented.');
  }
  getUsers(request: FilterParam): Promise<UserResp> | Observable<UserResp> | UserResp {
    throw new Error('Method not implemented.');
  }
  async getUserById(request: FilterParam): Promise<UserResp> {
      const result =  this.userService.getUserById(request.id)
      return result
    }
}
