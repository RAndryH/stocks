import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any): Promise<any> {
        return this.authService.login(body.email, body.password);
    }

    @Post('changepwd')
    async changePassword(@Body() body: any): Promise<any> {
        return this.authService.changePassword(body.email, body.password, body.newPassword)
    }

    @Post('forgotpwd')
    async forgotPassword(@Body() body:any): Promise<any> {
        return this.authService.forgotPassword(body.email, body.newPassword)
    }
}
