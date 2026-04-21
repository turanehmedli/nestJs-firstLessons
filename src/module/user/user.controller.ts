import { Body, Param, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  getAllUsers(): Promise<UserResponseDto[]> {
    return this.service.getAllUser();
  }

  @Roles(Role.ADMIN)
  @Get(':email')
  findByEmail(@Param() email: string): Promise<UserResponseDto> {
    return this.service.findByEmail(email);
  }

  @Roles(Role.ADMIN || Role.USER)
  @Post('new')
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.service.create(dto);
  }

  @Roles(Role.ADMIN || Role.USER)
  @Post('update')
  update(
    @Body() dto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    return this.service.update(id, dto);
  }
}