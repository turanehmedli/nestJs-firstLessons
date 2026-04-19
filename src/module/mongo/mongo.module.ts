import { Global, Module } from "@nestjs/common";
import * as mongoose from 'mongoose'
import { MongoService } from "./mongo.service";

@Global()
@Module({
    providers:[
        {
            provide:'MONGO',
            useFactory: async ()=>{
                const url = process.env.MONGO_URL || 'mongodb://localhost:27017/auth_logs';
                await mongoose.connect(url);
                console.log("Connected to MongoDB")
                return mongoose;
            }
        },
        MongoService,
    ],
    exports:['MONGO',MongoService],
})

export class MongoModule{}