import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../../infrastructure/prisma/prisma.service";
import { Post } from "../entities/post";

@Injectable()
export class PostsRepository {
    constructor(
        private readonly prismaService: PrismaService
    )
    {}

    async createPost(post: Post) {
        const { title, content, authorId } = post;
        return await this.prismaService.posts.create({
            data: {
                title,
                content,
                authorId
            }
        });
    }

    async getPost(postId: string) {
        const dbPost = await this.prismaService.posts.findFirst({
            where: {
                id: postId
            }
        });
        if (!dbPost) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }
        return Post.new(dbPost);
    }
}