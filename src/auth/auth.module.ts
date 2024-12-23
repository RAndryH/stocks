import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: async (confiService: ConfigService) => ({
        secret: confiService.get('JWT_SECRET'),
        signOptions: { 'expiresIn': '1h' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
