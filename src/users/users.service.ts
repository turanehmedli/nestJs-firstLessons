//servis filesi controlleri funksalarini idare edir
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private model:Model<User>){
        
    }

    async create(dto){
        return this.model.create(dto) 
    }

    async findByEmail(email:string){
        const user =  await this.model.findOne({email}).exec() //! exec() yazmasaq bize query qaytaracaq, exec() yazanda ise bize user qaytaracaq
        if(!user){
            throw new NotFoundException("User not found")
        }
        return user
    }

    async findByEmailRaw(email:string):Promise<UserDocument| null>{
        const user =  await this.model.findOne({email})
        if(!user){
            throw new NotFoundException("User not found")
        }
        return user
    }

    async getAllUser(){
        return this.model.find()
    }

    async update(userId, refreshToken){
        
    }

    async findById(id: string) {
        const user = await this.model.findOne({ where: { id } })
        if(!user){
            throw new Error("User not found")
        }
        return user

    }
    
}