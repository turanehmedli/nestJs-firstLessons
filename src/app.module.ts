import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {AuthModule} from './auth/auth.module'
import {UsersModule} from './users/users.module'
import {TodosModule} from './todos/todos.module'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),  //! !bu type errorunu onune kecir
    AuthModule,
    UsersModule,
    TodosModule
  ],

})
export class AppModule {}
