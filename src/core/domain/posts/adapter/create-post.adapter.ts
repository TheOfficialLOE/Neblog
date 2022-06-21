import { IsString, MaxLength, MinLength } from "class-validator";
import { CreatePostDto } from "../dtos/create-post.dto";
import { plainToClass } from "class-transformer";
import { ClassValidator } from "../../../common/utils/class-validator";

export class CreatePostAdapter extends ClassValidator {
    @MinLength(5)
    @MaxLength(100)
    @IsString()
    title: string;

    @MinLength(8)
    @IsString()
    content: string;

    public static async new(payload: CreatePostDto) {
        const adapter = plainToClass(CreatePostAdapter, payload);
        await adapter.validate();
        return adapter;
    }
}