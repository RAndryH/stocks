import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './users.schema';
import { encryptStr } from 'src/functions/global';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<UsersDocument>
    ) { }

    async create(user: Users): Promise<Users> {
        const password = user.password;
        let newUser = new Users();
        newUser.password = await encryptStr(password);
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

    async findByEmail(email: string): Promise<Users> {
        const findEmail = await this.usersModel.findOne({ email: email });
        if (!findEmail) {
            throw new Error('Email not found');
        }
        return findEmail;
    }

    async changePassword(email: string, newPassword: string): Promise<Users> {
        return await this.usersModel.findOneAndUpdate({email: email}, {password: newPassword})
    }

    async changeUserStatus(id: string, status: Boolean): Promise<Users> {
        return await this.usersModel.findByIdAndUpdate(id, {is_active: status}, { new: true})
    }
}
