import { Injectable, UnauthorizedException } from '@nestjs/common';

// interfaces
import { SignupRsp, User, LoginRsp } from './interfaces/user.interface';

// data transfer objects
import { CreateUserDTO } from './dto/create-user.dto';

// mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// services
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';

// jwt
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  // tslint:disable-next-line:no-empty
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,
    private hasherService: PasswordHasherService,
    private jwtService: JwtService
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

  async login(doc: CreateUserDTO): Promise<LoginRsp> {
    console.log('user.servie login...');
    // verify user email
    const user = await this.userModel.findOne( { email: doc.email });
    if (!user) {
      throw new UnauthorizedException(`Could not find any user with this email ${doc.email}`);
    }

    // verify user password
    const matchedPassword = await this.hasherService.comparePassword(doc.password, user.password);
    if (matchedPassword) {
      // generate json web token
      const token = await this.jwtService.signAsync({
        id: user.id,
        email: user.email
      });

      return { token };

    } else {
      throw new UnauthorizedException('Invalid password');
    }

  }
}
