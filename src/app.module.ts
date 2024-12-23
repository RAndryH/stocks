import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `.env.${process.env.NODE_ENV || 'dev'}` }),
    UsersModule,
    MongooseModule.forRoot(`${process.env.DATABASE_URL}`) // mongodb+srv://randryh:xrLsLv7Nwn7q0YyD@cluster0.xjaop.mongodb.net/StocksNestJs_db  // 'mongodb://localhost:27017/StocksNestJs_db'
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor() {
    console.log(`process.env.DATABASE_URL: ${process.env.DATABASE_URL}`);
  }
}
