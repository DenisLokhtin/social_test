import { Controller, Get } from '@nestjs/common';
import {PostService} from "./post.service";
import {PostEntity} from "@app/entity/post.entity";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {
    }
    @Get()
    async findAll(): Promise<PostEntity[]> {
        return await this.postService.findAll()
    }
}
