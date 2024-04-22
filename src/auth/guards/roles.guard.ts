import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UsersService } from "src/users/users.service";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly usersService: UsersService,
        private readonly reflector: Reflector
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = await this.usersService.findOne(request.user.userId);
        const hasRole = () => roles.includes(user?.role);
        return user && user.role && hasRole();
    }
}