import { Module } from "@nestjs/common";
import { UsersController } from "../controllers/users.controller";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { UsersService } from "../../core/services/users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { ServerKeys } from "../../infrastructure/config/server-keys";

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
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}