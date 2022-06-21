import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Protected } from "../../core/common/decorators/http-auth.decorator";
import { PostsService } from "../../core/domain/posts/services/posts.service";
import { getUser } from "../../core/common/decorators/get-user.decorator";
import { CreatePostDto } from "../../core/domain/posts/dtos/create-post.dto";
import { CreatePostAdapter } from "../../core/domain/posts/adapter/create-post.adapter";

@Controller("posts")
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    )
    {}

    @Protected()
    @Post()
    async createPost(@getUser("id") userId: string, @Body() createPostDto: CreatePostDto) {
        const adapter = await CreatePostAdapter.new(createPostDto);
        return await this.postsService.createPost(userId, adapter);
    }

    @Get(":id")
    async getPost(@Param("id") postId: string) {
        return await this.postsService.getPost(postId);
    }
}