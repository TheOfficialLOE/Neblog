import { Entity } from "../../../common/entity/entity";
import { IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreatePostEntity } from "./types/create-post-entity";

export class Post extends Entity {
    @MinLength(5)
    @MaxLength(100)
    @IsString()
    title: string;

    @MinLength(8)
    @IsString()
    content: string;

    @IsString()
    @IsUUID()
    authorId: string;

    public static async new(payload: CreatePostEntity): Promise<Post> {
        const post = plainToClass(Post, payload);
        await post.validate();
        return post;
    }
}