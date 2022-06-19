import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../../core/domain/users/dtos/create-user.dto";
import { UsersService } from "../../core/domain/users/services/users.service";
import { LoginUserDto } from "../../core/domain/users/dtos/login-user.dto";

@Controller("auth")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("login")
    async login(@Body() loginDto: LoginUserDto) {
        return await this.usersService.login(loginDto);
    }

    @Post("signup")
    async signup(@Body() createUserDto: CreateUserDto) {
        if (!createUserDto.acceptTermsAndConditions)
            throw "You must accept the terms and conditions";
        return this.usersService.signup(createUserDto);
    }
}