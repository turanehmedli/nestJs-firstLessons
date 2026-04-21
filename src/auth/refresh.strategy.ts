import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { UserService } from "../users/users.service";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(private userService: UserService){
        super({
            secretOrKey:process.env.JWT_REFRESH_SECRET as string,
            jwtFromRequest:ExtractJwt.fromBodyField('refreshToken'),
            passReqToCallback:true
        })
    }

    //CHecks if user for given tokens is delete
    async validate(req: Request, payload: any){
        const refreshToken = req.body.refreshToken
        const user = await this.userService.findById(payload.id)

        if(!refreshToken){
            throw new UnauthorizedException("Refresh token is missing")
        }

        if(!user || !user.refreshToken){
            throw new UnauthorizedException("Invalid refresh token")
        }

        return {
            id:user._id.toString(),
            email:user.email,
            role:user.role,
            refreshToken
        }
    }
}