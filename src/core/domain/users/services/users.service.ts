import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        const user = await User.new({
            email: loginDto.email,
            password: loginDto.password,
            acceptTermsAndConditions: true
        });
        const dbUser = await this.usersRepository.findUser(user.email);
        if (!dbUser)
            throw new NotFoundException("User not found");
        if (!await HashHelper.compare(loginDto.password, dbUser.password))
            throw new BadRequestException("Wrong password");
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
            throw new BadRequestException("User already exists");
        }
        await this.usersRepository.saveUser(user);
        return this.jwtService.sign({ email: user.email });
    }
}