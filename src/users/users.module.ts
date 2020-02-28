import { Module } from '@nestjs/common';

// controllers
import { UsersController } from './users.controller';

// services
import { UsersService } from './users.service';

// mongoose
import { MongooseModule } from '@nestjs/mongoose';

// schemas
import { UserSchema } from './schemas/users.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
