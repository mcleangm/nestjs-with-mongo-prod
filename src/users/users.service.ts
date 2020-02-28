import { Injectable } from '@nestjs/common';

// interfaces
import { SignupRsp, User } from './interfaces/user.interface';

// data transfer objects
import { CreateUserDTO } from './dto/create-user.dto';

// mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  // tslint:disable-next-line:no-empty
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>
  ) {}

  async signup(doc: CreateUserDTO): Promise<SignupRsp> {
    const newUser = new this.userModel(doc);
    return await newUser.save();
  }
}
