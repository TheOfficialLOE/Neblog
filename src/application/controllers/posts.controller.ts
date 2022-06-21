import { Controller, Post } from "@nestjs/common";
import { Protected } from "../../core/common/decorators/http-auth.decorator";

@Controller("posts")
export class PostsController {

    @Protected()
    @Post()
    async create() {
        return "Create post";
    }
}