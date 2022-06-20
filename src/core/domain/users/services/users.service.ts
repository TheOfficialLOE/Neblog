import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users.repository";
import { JwtService } from "@nestjs/jwt";
import { HashHelper } from "../../../common/utils/hash-helper";
import { LoginAdapter } from "../adapters/login-adapter";
import { SignupAdapter } from "../adapters/signup-adapter";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
        )
    {}

    async login(loginAdapter: LoginAdapter) {
        const { email, password } = loginAdapter;
        const dbUser = await this.usersRepository.findUser(email);
        if (!dbUser)
            throw new NotFoundException("User not found");
        if (!await HashHelper.compare(password, dbUser.password))
            throw new BadRequestException("Wrong password");
        return this.jwtService.sign({
            email,
        });
    }

    async signup(signupAdapter: SignupAdapter) {
        const { email, password, acceptTermsAndConditions } = signupAdapter;
        const user = await User.new({
            email,
            password,
            acceptTermsAndConditions
        });
        if (await this.usersRepository.countUsers(email)) {
            throw new BadRequestException("User already exists");
        }
        await this.usersRepository.createUser(user);
        return this.jwtService.sign({ email: user.email });
    }
}