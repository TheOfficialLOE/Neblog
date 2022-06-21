import { Module } from "@nestjs/common";
import { PostsController } from "../controllers/posts.controller";
import { JwtModule } from "@nestjs/jwt";
import { ServerKeys } from "../../infrastructure/config/server-keys";
import { UsersModule } from "./users.module";
import { PrismaModule } from "../../infrastructure/prisma/prisma.module";
import { PostsService } from "../../core/domain/posts/services/posts.service";
import { PostsRepository } from "../../core/domain/posts/repositories/posts.repository";

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        JwtModule.register({
        secret: ServerKeys.JWT_SECRET,
        signOptions: {
            expiresIn: ServerKeys.JWT_EXPIRES_IN
        }
    })],
    providers: [
        PostsService,
        PostsRepository
    ],
    controllers: [PostsController],
})
export class PostsModule {}