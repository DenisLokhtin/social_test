import {Controller, Get, Param} from '@nestjs/common';
import {PostService} from "./post.service";
import {PostEntity} from "@app/entity/post.entity";
import emailValidate from "../../../middlewares/emailValidate";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {
    }
    @Get()
    async findAll(@Param('email') email): Promise<void>   {
        const req = await this.postService.findAll(email);

        await emailValidate(email, req)
    }
}
