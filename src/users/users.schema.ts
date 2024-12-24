import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

export type UsersDocument = Users & Document;

@Schema()
export class Users {

    @Prop({required: true})
    username: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true, minlength: 6})
    password: string;

    @Prop({default: Date.now})
    created_at: Date;

    @Prop({required: true})
    created_by: string;

    @Prop({default: Date.now, required: false})
    updated_at: Date;

    @Prop({required: false})
    updated_by: string;

    @Prop({enum: ['admin', 'user'], default: 'user', required: true})
    role: string;

    @Prop({default: true, type: Boolean})
    is_active: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);