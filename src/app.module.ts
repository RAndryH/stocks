import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV || 'dev'}` }),
    UsersModule,
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
