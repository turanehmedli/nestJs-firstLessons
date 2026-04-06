import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guards";
import { Roles } from "../common/decorators/roles.decorator";
import { Role } from "../common/enums/role.enum";
import { UserResponseDto } from "./dto/user-response.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("users")
export class UserController{
    constructor(private service:UserService ){}

    @Roles(Role.ADMIN)
    @Get()
    getAllUser(): Promise<UserResponseDto[]>{
        return this.service.getAllUser()
    }

    @Roles(Role.ADMIN)
    @ApiParam({
        name:"email",
        required:true,
        type:String,
        description:"User email"
    })
    @Get(':email')
    findByEmail(@Param('email') email:string): Promise<UserResponseDto>{
        return this.service.findByEmail(email)
    }

    @Roles(Role.ADMIN || Role.USER)
    @Post("new")
    create(@Body() body:any){
        return this.service.create(body)
    }

    @Roles(Role.ADMIN || Role.USER)
    @Post("update")
    update(@Body() body:any){
        return this.service.update(body.userId, body.refreshToken)
    }
}