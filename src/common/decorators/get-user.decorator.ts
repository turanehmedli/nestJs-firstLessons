<<<<<<< HEAD
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "src/common/enums/role.enum";

export class GetUser {
  @ApiPropertyOptional({ example: "test@gmail.com" })
  email?: string;

  @ApiPropertyOptional({ enum: Role, example: Role.USER })
  role?: Role;

  @ApiPropertyOptional({ example: "6612c9f1a8d9b2a1c4e12345" })
  userId?: string;
=======


export class GetUser{

>>>>>>> ae51b87466da4c88a43a608fbe6fff669e9ed1b1
}