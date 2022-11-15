import { Injectable } from '@nestjs/common';
import {PostEntity} from "@app/entity/post.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) {}
    async findAll(): Promise<PostEntity[]> {
        return await this.postRepository.find()
    }
}
