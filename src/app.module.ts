import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://randryh:xrLsLv7Nwn7q0YyD@cluster0.xjaop.mongodb.net/StocksNestJs_db')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
