import {
    Injectable,
    CanActivate,
    ExecutionContext
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import {ROLES_KEY} from '../decorators/roles.decorator'
import { Role } from '../enums/role.enum'

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(ctx: ExecutionContext): boolean{
        const requiredRole = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [ctx.getHandler(), ctx.getClass()]
        )

        if(!requiredRole) return true;

        const {user} = ctx.switchToHttp().getRequest()
        return requiredRole.includes(user.role)
    }
}