import { Injectable } from '@nestjs/common';

// bcrypt
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService {

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(plainText, encryptedPassword): Promise<boolean> {
        return await bcrypt.compare(plainText, encryptedPassword);
    }
}
