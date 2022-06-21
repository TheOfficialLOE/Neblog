import { Injectable } from "@nestjs/common";
import { PostsRepository } from "../repositories/posts.repository";
import { CreatePostAdapter } from "../adapter/create-post.adapter";
import { Post } from "../entities/post";

@Injectable()
export class PostsService {
    constructor(
        private readonly postsRepository: PostsRepository
    )
    {}

    async createPost(userId: string, createPostAdapter: CreatePostAdapter) {
        const { title, content } = createPostAdapter;
        const post = await Post.new({
            title,
            content,
            authorId: userId
        });
        return await this.postsRepository.createPost(post);
    }

}