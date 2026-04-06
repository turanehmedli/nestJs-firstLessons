import { Module } from "@nestjs/common";
import {TodoService} from './todos.service'
import {TodoController} from './todos.controller'
import { MongooseModule } from "@nestjs/mongoose";
import {Todo, TodoSchema} from './todos.schema'

@Module({
    imports:[
        MongooseModule.forFeature([{name:Todo.name, schema:TodoSchema}])
    ],
    providers:[TodoService],
    controllers:[TodoController],
})

export class TodosModule{}