import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>
    ) { }

    async create(user: Users): Promise<Users> {
        const password = user.password;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = new Users();
        newUser.password = hash;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.created_by = user.created_by;
        newUser.role = user.role;
        newUser.is_active = user.is_active;

        const createdUser = new this.usersModel(newUser);
        return createdUser.save();
    }

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }

    async findOne(id: string): Promise<Users> {
        const user = await this.usersModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return await this.usersModel.findById(id).exec();
    }

    async update(id: string, user: Users): Promise<Users> {
        const usersUpdate = this.usersModel.findById(id);
        if (!usersUpdate) {
            throw new Error('User not found');
        }
        return this.usersModel.findByIdAndUpdate(id, user, { new: true });
    }

    async remove(id: string): Promise<Users> {
        const usersRemove = this.usersModel.findById(id);
        if (!usersRemove) {
            throw new Error('User not found');
        }
        return this.usersModel.findByIdAndDelete(id).exec();
    }
}
