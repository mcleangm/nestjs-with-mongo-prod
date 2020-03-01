import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';

// swagger api
import { ApiTags, ApiCreatedResponse, ApiForbiddenResponse, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';

// interfaces
import { User, SignupRsp, LoginRsp } from './interfaces/user.interface';

// services
import { UsersService } from './users.service';

// data transfer object
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

// guards
import { RolesGuard } from '../common/roles-guard';


@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'User has successfully created'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  async signup(@Body() user: CreateUserDTO): Promise<SignupRsp> {
    return await this.userService.signup(user);
  }

  @Post('login')
  @ApiCreatedResponse({
    description: 'User has successfully logged in'
  })
  @ApiForbiddenResponse({
    description: 'Forbidden'
  })
  async login(@Body() user: CreateUserDTO): Promise<LoginRsp> {
    console.log('LOGIN ENDPOINT');

    return await this.userService.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Get('profile')
  @ApiCreatedResponse({
    description: 'User has successfully found the profile'
  })
  @ApiForbiddenResponse({
    description: 'Unauthorized'
  })
  async profile(@Request() req) {
    return req.user;
  }

}
