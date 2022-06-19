import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users.repository";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "../dtos/login-user.dto";
import { HashHelper } from "../../../common/hash/hash-helper";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
        )
    {}

    async login(loginDto: LoginUserDto) {
        const dbUser = await this.usersRepository.findUser(loginDto.email);
        if (!dbUser)
            throw "User not found";
        if (!await HashHelper.compare(loginDto.password, dbUser.password))
            throw "Wrong password";
        return this.jwtService.sign({
            email: loginDto.email,
        });
    }

    async signup(createUserDto: CreateUserDto) {
        const user = await User.new({
            email: createUserDto.email,
            password: createUserDto.password,
            acceptTermsAndConditions: createUserDto.acceptTermsAndConditions
        });
        if (await this.usersRepository.countUsers(user.email)) {
            throw "User already exists";
        }
        await this.usersRepository.saveUser(user);
        return this.jwtService.sign({ email: user.email });
    }
}