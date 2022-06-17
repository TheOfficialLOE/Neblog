import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../infrastructure/prisma/prisma.service";
import { CreateUserAdapter } from "../../domain/users/adapters/create-user.adapter";
import { ServerKeys } from "../../../infrastructure/config/server-keys";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    async createUser(adapter: CreateUserAdapter) {
        const { email, password, acceptTermsAndConditions } = adapter;
        if (!acceptTermsAndConditions) {
            throw new Error('You must accept the terms and conditions');
        }
        const salt = ServerKeys.SALT_ROUNDS;
        const hashedPassword = await bcrypt.hash(password, salt);
        await this.prismaService.users.create({
            data: {
                email,
                password: hashedPassword,
                acceptTermsAndConditions
            }
        });
        return this.jwtService.sign({email});
    }
}