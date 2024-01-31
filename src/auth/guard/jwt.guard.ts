import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { RoleEnum } from 'src/enums';
import { IS_PUBLIC_KEY, ROLES_KEY } from 'src/constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        super();
    }

    canActivate(context: ExecutionContext) {
        // Check if the route is public
        const isPublic = this.reflector.get(
            IS_PUBLIC_KEY,
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        // Check if the user has the required roles
        const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const token = this.getTokenFromRequest(request);

        request.user = this.jwtService.verify(token, {
            secret: this.configService.get('JWT_SECRET')
        });

        const userRole = request.user.role;

        return requiredRoles.some((role) => userRole === role);
    }

    private getTokenFromRequest(request: Request) {
        const authHeader = request.headers.authorization;
        return authHeader?.split(' ')[1];
    }
}
