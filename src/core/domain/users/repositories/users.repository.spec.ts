import { UsersRepository } from "./users.repository";
import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";
import { User } from "../entities/user";

const users = [
    {
        id: randomUUID(),
        email: "haha@haha.com",
        password: "haha",
        acceptTermsAndConditions: true
    },
    {
        id: randomUUID(),
        email: "fooo@foo.com",
        password: "fooo",
        acceptTermsAndConditions: true
    }
];

const oneUser = users[0];

const db = {
    users: {
        count: jest.fn().mockResolvedValue(users.length),
        findUnique: jest.fn().mockResolvedValue(oneUser),
        create: jest.fn().mockResolvedValue(oneUser.id)
    }
}

describe("UsersRepository", () => {
    let repository: UsersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersRepository,
                {
                    provide: PrismaService,
                    useValue: db
                }
            ]
        }).compile();

        repository = module.get<UsersRepository>(UsersRepository);
    });

    it("should return the list of users", async () => {
        const usersCount = await repository.countUsers("");
        expect(usersCount).toEqual(2);
    });

    it("should return the user", async () => {
        const user = await repository.findUser("");
    });

    it("should create the user", async () => {
        const user = await repository.createUser(await User.new(oneUser));
    });
});