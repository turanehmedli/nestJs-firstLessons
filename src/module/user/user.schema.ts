import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  email!: string;

  @Prop({ minLength: [8, 'Password must be at least 8 characters long'] })
  password!: string;

  @Prop({ default: Role.USER })
  role!: Role;

  @Prop({ default: '' })
  refreshToken!: string;

  @Prop()
  createdAt!: string;

  @Prop()
  updatedAt!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);