import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todos.service';
import { ApiBearerAuth, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserDto } from 'src/users/dto/user.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('todos')
export class TodoController {
  constructor(private service: TodoService) {}

  @Roles(Role.ADMIN)
  @Get()
  getAllTodo() {
    return this.service.findAll();
  }

  @Post('newTodo')
  create(@Body() dto: CreateTodoDto, @GetUser() user: UserDto) {
    return this.service.create(dto, user.id);
  }

  @Get('me')
  getMyTodos(@GetUser() user: UserDto) {
    return this.service.findAllByUserId(user.id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Todo id',
    required: true,
    type: String,
  })
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Todo id',
    required: true,
    type: String,
  })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
 
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Todo id',
    required: true,
    type: String,
  })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Roles(Role.ADMIN)
  @Delete('admin/:id')
  @ApiParam({
    name: 'id',
    description: 'Todo id',                          
    required: true,
    type: String,
  })
  deleteAny(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
