import { Injectable } from "@nestjs/common";
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
        if (user)
            return await User.loadExisting(user);
        return null;
    }

    async createUser(user: User) {
        const { email, password, acceptTermsAndConditions } = user;
        await this.prismaService.users.create({
            data: {
                email,
                password,
                acceptTermsAndConditions
            }
        });
    }
}