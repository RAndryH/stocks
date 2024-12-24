import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { encryptStr } from 'src/functions/global';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async login(email: string, passwordLogin: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)
        if (!user) {
            throw new Error('User not found');
        }

        const password = user.password;
        const isMatch = await bcrypt.compare(password, await encryptStr(passwordLogin));
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        return { access_token: this.jwtService.sign({ email: user.email, role: user.role }) };
    }

    async changePassword(email: string, password: string, newPassword: string): Promise<any> {
        const user: any = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        user.password = await encryptStr(newPassword)
        return this.usersService.update(user._id, user)
    }

    async forgotPassword(email: string, newPassword: string): Promise<any> {
        const currEmail: any = await this.usersService.findByEmail(email)
        if (!currEmail) {
            throw new Error('Email does not exists')
        }
        const hash = await encryptStr(newPassword)
        currEmail.password = hash
        return this.usersService.update(currEmail._id, currEmail)
    }

}
