import { Module } from "@nestjs/common";
import { PostsController } from "../controllers/posts.controller";
import { JwtModule } from "@nestjs/jwt";
import { ServerKeys } from "../../infrastructure/config/server-keys";
import { UsersModule } from "./users.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
        secret: ServerKeys.JWT_SECRET,
        signOptions: {
            expiresIn: ServerKeys.JWT_EXPIRES_IN
        }
    })],
    controllers: [PostsController],
})
export class PostsModule {}