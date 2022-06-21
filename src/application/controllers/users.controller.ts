import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../core/domain/users/dtos/create-user.dto";
import { UsersService } from "../../core/domain/users/services/users.service";
import { LoginUserDto } from "../../core/domain/users/dtos/login-user.dto";
import { LoginAdapter } from "../../core/domain/users/adapters/login.adapter";
import { SignupAdapter } from "../../core/domain/users/adapters/signup.adapter";

@Controller("auth")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("login")
    async login(@Body() loginDto: LoginUserDto) {
        const adapter = await LoginAdapter.new(loginDto);
        return await this.usersService.login(adapter);
    }

    @Post("signup")
    async signup(@Body() createUserDto: CreateUserDto) {
        const adapter = await SignupAdapter.new(createUserDto);
        return this.usersService.signup(adapter);
    }
}