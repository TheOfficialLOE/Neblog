import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "../../domain/users/repositories/users.repository";

@Injectable()
export class HttpRoleAuthGuard implements CanActivate {

    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = <Request>context.switchToHttp().getRequest();
        const isAuthorized = await this.checkAuthorization(request);
        if (isAuthorized)
            return true;
    }

    private async checkAuthorization(request: Request): Promise<boolean> {
        const token = request.headers["x-auth-token"].toString();
        const email = this.jwtService.decode(token)["email"];
        return await this.checkUserExistence(email);
    }

    private async checkUserExistence(email: string): Promise<boolean> {
        const user = await this.usersRepository.findUser(email);
        if (!user)
            throw new UnauthorizedException("User not found");
        return true;
    }
}