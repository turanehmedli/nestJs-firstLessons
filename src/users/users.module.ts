import { Module } from "@nestjs/common";
import { UserController} from './users.controller'
import { UserService} from './users.service'
import { MongooseModule } from "@nestjs/mongoose";
import {User, UserSchema} from './users.schema'

@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
    ],
    providers:[UserService],
    controllers:[UserController],
    exports:[UserService]
})

export class UsersModule {}