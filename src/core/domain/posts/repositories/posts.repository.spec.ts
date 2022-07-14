import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";
import { PostsRepository } from "./posts.repository";

const db = {
    posts: {
        create: jest.fn(),
        findFirst: jest.fn()
    }
};

describe("PostsRepository", () => {

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostsRepository,
                {
                    provide: PrismaService,
                    useValue: db
                }
            ]
        }).compile();
    })

    it("should create the post", async () => {
        const post = await db.posts.create();
    });

    it("should find the post", async () => {
        const post = await db.posts.findFirst();
    });
});