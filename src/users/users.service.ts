import { Injectable, UnauthorizedException } from '@nestjs/common';

// interfaces
import { SignupRsp, User } from './interfaces/user.interface';

// data transfer objects
import { CreateUserDTO } from './dto/create-user.dto';

// mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// services
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';

@Injectable()
export class UsersService {
  // tslint:disable-next-line:no-empty
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,
    private hasherService: PasswordHasherService
  ) {}

  async signup(doc: CreateUserDTO): Promise<SignupRsp> {
    // check if user already created signup account with email
    const user = await this.userModel.findOne( { email: doc.email });
    if (user) {
      throw new UnauthorizedException(`User already created with ${doc.email}`);
    }

    // encrypt user password
    const encryptedPassword = await this.hasherService.hashPassword(doc.password);
    const newUser = new this.userModel({
      email: doc.email,
      password: encryptedPassword
    });

    // save model document
    await newUser.save();

    return { email: newUser.email };
  }
}
