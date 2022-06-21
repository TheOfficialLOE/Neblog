import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/users.controller";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { UsersService } from "../../core/domain/users/services/users.service";
import { JwtModule } from "@nestjs/jwt";
import { ServerKeys } from "../../infrastructure/config/server-keys";
import { UsersRepository } from "../../core/domain/users/repositories/users.repository";

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            secret: ServerKeys.JWT_SECRET,
            signOptions: {
                expiresIn: ServerKeys.JWT_EXPIRES_IN
            }
        })
    ],
    providers: [
        UsersService,
        UsersRepository
    ],
    controllers: [
        UsersController
    ],
    exports: [UsersRepository]
})
export class UsersModule {}