import { Module } from '@nestjs/common';
import { UsersModule } from "./users.module";
import { PostsModule } from "./posts.module";

@Module({
  imports: [
      UsersModule,
      PostsModule
  ],
})
export class AppModule {}