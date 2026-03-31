//servis filesi controlleri funksalarini idare edir
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./users.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model:Model<User>){}

    create(dto){
        return this.model.create(dto)
    }

    findByEmail(email:string){
        return this.model.findOne({email})
    }

    getAllUser(){
        return this.model.find()
    }
}