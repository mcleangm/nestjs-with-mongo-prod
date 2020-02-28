import { Controller, Post, Body } from '@nestjs/common';

// interfaces
import { User, SignupRsp, LoginRsp } from './interfaces/user.interface';

// services
import { UsersService } from './users.service';

// data transfer object
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDTO): Promise<SignupRsp> {
    return await this.userService.signup(user);
  }

  @Post('login')
  async login(@Body() user: CreateUserDTO): Promise<LoginRsp> {
    console.log('LOGIN ENDPOINT');

    return await this.userService.login(user);
  }

}
