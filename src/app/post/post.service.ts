import { Injectable } from '@nestjs/common';
import { PostEntity } from '@app/entity/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '@app/dto/CreatePostDto.dto';
import { ProfileEntity } from '@app/entity/profile.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(email: string): Promise<PostEntity[] | string> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (!profile) return 'Такого пользователя не существует';

    return await this.postRepository.find({
      relations: ['profile'],
      take: 20,
    });
  }

  async createOne(email, createPostDto: CreatePostDto): Promise<any> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (!profile) return 'Такого пользователя не существует';
    return await this.postRepository.save({
      description: createPostDto.description,
      profile: profile,
    });
  }
}
