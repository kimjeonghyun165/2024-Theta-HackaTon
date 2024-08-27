import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TOKEN_TYPE_KEY } from '../decorators/token-type.decorator';


@Injectable()
export class TokenTypeGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredType = this.reflector.getAllAndOverride<string>(TOKEN_TYPE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredType) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header missing');
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = this.jwtService.decode(token);

        if (!decodedToken || decodedToken['type'] !== requiredType) {
            throw new UnauthorizedException('Invalid token type');
        }

        return true;
    }
}
