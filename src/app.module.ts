import { Module } from '@nestjs/common';
import { UsersModule } from "./application/modules/users.module";

@Module({
  imports: [UsersModule],
})
export class AppModule {}