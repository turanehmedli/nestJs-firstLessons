import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../common/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    unique: true,
    required: true
  })
  email!: string;

  @Prop({
    required: true,
    minlength: 6
  })
  password!: string;

  @Prop({
    default: Role.USER
  })
  role!: Role;

  @Prop()
  refreshToken!:string;
}

export const UserSchema = SchemaFactory.createForClass(User);