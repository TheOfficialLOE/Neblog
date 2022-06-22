import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user";
import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async countUsers(email: string): Promise<number> {
        return await this.prismaService.users.count({
            where: { email }
        });
    }

    async findUser(email: string) {
        const user = await this.prismaService.users.findUnique({
            where: { email }
        });
        if (!user)
            throw new NotFoundException(`User with email ${email} not found`);
        return await User.loadExisting(user);
    }

    async createUser(user: User) {
        const { email, password, acceptTermsAndConditions } = user;
        const newUser = await this.prismaService.users.create({
            data: {
                email,
                password,
                acceptTermsAndConditions
            }
        });
        return newUser.id;
    }
}