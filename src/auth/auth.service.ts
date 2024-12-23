import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async login(email: string, passwordLogin: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)
        if (!user) {
            throw new Error('User not found');
        }

        const password = user.password;
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
        const hash = await bcrypt.hash(passwordLogin, salt);
        const isMatch = await bcrypt.compare(password, hash);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        return { access_token: this.jwtService.sign({ email: user.email, role: user.role }) };
    }
}
