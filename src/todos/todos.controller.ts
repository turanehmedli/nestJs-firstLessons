import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TodoService } from "./todos.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guards";
import { Roles } from "src/common/decorators/roles.decorator";
import { Role } from "src/common/enums/role.enum";

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("todos")

export class TodoController{
    constructor(private service:TodoService){}

    @Roles(Role.ADMIN)
    @Get()
    getAllTodo(){
        return this.service.getAllTodo()
    }

    @Roles(Role.ADMIN, Role.USER)
    @Get(":id")
    getTodoById(@Param("id") id:string){
        return this.service.getTodoById(id)
    }

    @Roles(Role.ADMIN, Role.USER)
    @Post('newTodo')
    create(@Body() body:any){
        return this.service.create(body)
    }
}