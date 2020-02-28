import { Injectable, UnauthorizedException } from '@nestjs/common';

// nestjs passport
import { PassportStrategy } from '@nestjs/passport';

// passport-jwt
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../../../constants/jwt.constants';

// services
import { UsersService } from '../../users.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        })
    }

    async validate(payload: any) {
        // find the user based on id from the payload.id
        console.log('JwtStrategyService... validate payload: ');
        console.log(payload);

        const isValidated = await this.userService.validateUserById(payload.id);
        if (isValidated) {
            return {
                userId: payload.id,
                email: payload.email
            }
        } else {
            throw new UnauthorizedException('Unauthorized!');
        }

    }
}
