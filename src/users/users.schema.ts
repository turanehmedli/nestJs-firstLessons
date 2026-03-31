import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose'
import {Role} from '../common/enums/role.enum'

@Schema() //@ bu isarenin adi decoreti
export class User extends Document {
    @Prop({
        unique:true
    })
    email:string;

    @Prop({
        minLength:[6, "password must be at least 6 characters long"]
    })
    password:string;

    @Prop({
        default:Role.USER
    })
    role:Role
}

export const UserSchema = SchemaFactory.createForClass(User)