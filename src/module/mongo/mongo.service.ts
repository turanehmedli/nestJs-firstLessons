import { Inject, Injectable } from "@nestjs/common";
import { Model, Schema, model } from "mongoose";

export interface AuthLog{
    level:string;
    message:string;
    meta?:any;
    createAt:Date;
}

const AuthLogSchema = new Schema<AuthLog>({
    level:{type:String, required:true},
    message:{type:String, required:true},
    meta:{type:Schema.Types.Mixed},
    createAt:{type:Date, default:()=> new Date()},
});

@Injectable()
export class MongoService{
    private AuthLogModel:Model<AuthLog>;
    constructor(@Inject('MONGO') private readonly mongoose){
        this.AuthLogModel = model<AuthLog>('AuthLog', AuthLogSchema)
    }

    async log(level: string, message:string, meta?:any){
        try {
            await this.AuthLogModel.create({level, message, meta})
        } catch (error) {
            console.log("Mongo Error", error)
        }
    }
}