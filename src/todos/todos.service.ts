import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Todo } from "./todos.schema";
import { Model } from "mongoose";

@Injectable()
export class TodoService{
    constructor(@InjectModel(Todo.name) private model:Model<Todo>){}

    getAllTodo(){
        return this.model.find()
    }

    getTodoById(id:string){
        return this.model.findOne({id})
    }

    create(dto){
        return this.model.create(dto)
    }

    
}