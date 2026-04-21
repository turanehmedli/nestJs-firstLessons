import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { UserService } from "../users/users.service";

interface AccessJwtPayload {
    id:string;
    role:string;
    email:string;
    iat?:number;
    exp?:number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private userService: UserService){
        super({
            secretOrKey:process.env.JWT_SECRET as string,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    //CHecks if user for given tokens is delete
    async validate(payload: AccessJwtPayload){
        const user = await this.userService.findById(payload.id)

        if(!user){
            throw new UnauthorizedException("User no longer exits")
        }

        return {
            id:user._id.toString(),
            email:user.email,
            role:user.role
        }
    }
}