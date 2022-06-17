import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../core/domain/users/dtos/create-user.dto";
import { UsersService } from "../../core/services/users/users.service";
import { CreateUserAdapter } from "../../core/domain/users/adapters/create-user.adapter";

@Controller("auth")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("signup")
    async signup(@Body() createUserDto: CreateUserDto) {
        const adapter = CreateUserAdapter.new(createUserDto);
        const jwt = await this.usersService.createUser(adapter);
        return jwt;
    }

}