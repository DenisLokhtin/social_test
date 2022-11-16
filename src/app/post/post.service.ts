import {Injectable} from '@nestjs/common';
import {PostEntity} from "@app/entity/post.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreatePostDto} from "@app/dto/CreatePostDto.dto";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {
    }

    async findAll(email: string): Promise<PostEntity[]> {
        return await this.postRepository.find({
            take: 20,
            where: {author_email: email},
        })
    }

    async createOne(email, createPostDto: CreatePostDto): Promise<any> {
        const newPost = {
            author_email: email,
            createPostDto
        };
        return await this.postRepository.save(newPost);
    }
}
