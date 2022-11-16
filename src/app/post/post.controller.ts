import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PostService} from "./post.service";
import emailValidate from "../../../middlewares/emailValidate";
import {CreatePostDto} from "@app/dto/CreatePostDto.dto";

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @Get()
    async findAll(@Param('email') email): Promise<void> {
        const req = await this.postService.findAll(email);

        return await emailValidate(email, req)
    }

    @Post()
    async createOne(@Param('email') email, @Body() createPostDto: CreatePostDto): Promise<void> {
        const req = await this.postService.createOne(email, createPostDto);

        return await emailValidate(email, req)
    }
}
