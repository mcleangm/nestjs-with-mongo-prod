import { Module } from '@nestjs/common';

// jwt
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constants';

// controllers
import { UsersController } from './users.controller';

// services
import { UsersService } from './users.service';

// mongoose
import { MongooseModule } from '@nestjs/mongoose';

// schemas
import { UserSchema } from './schemas/users.schema';

// services
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';

@Module({
  imports: [
    JwtModule.register({ secret: jwtConstants.secret }),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasherService],
})
export class UsersModule {}
