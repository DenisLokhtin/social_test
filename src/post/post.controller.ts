import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import emailValidate from '../../middlewares/emailValidate';
import { CreatePostDto } from '@app/post/dto/CreatePostDto.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PostEntity } from '@app/post/entity/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async findAll(
    @Param('email') email,
    @Query('datetime') datetime,
  ): Promise<PostEntity> {
    const req = await this.postService.findAll(email, datetime);

    return await emailValidate(email, req);
  }

  @Post()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async createOne(
    @Param('email') email,
    @Body() createPostDto: CreatePostDto,
  ): Promise<PostEntity> {
    const req = await this.postService.createOne(email, createPostDto);

    return await emailValidate(email, req);
  }
}
